import { isPlainObject, uniq } from 'lodash';
import Player from '../../server/models/player.model';

class SharedGame {
  getField() {}

  /**
   * Find the possible locations for a tile type
   *
   * @param {string} tile Tile type (ocean, city, greenery, {special: 'type'})
   * @param {object} player The player finding possible tiles
   */
  findPossibleTiles(tile, player, customFilter) {
    const self = this;
    const notReserved = t => !t.attrs?.some(attr => attr.includes('reserved'));
    let filter;

    // If the card has a special placement (special tiles, typically)
    if (customFilter) {
      filter = t => customFilter(t, this, notReserved, this.neighbors(t));
    }

    // By default, special tiles have no placement restrictions (other than reserved tiles)
    else if (tile.special) {
      filter = t =>
        // Not reserved
        notReserved(t);
    }

    // Oceans can only be placed on reserved ocean tiles
    else if (tile === 'ocean') {
      filter = t =>
        // Reserved ocean spots
        t.attrs?.includes('reserved-ocean');
    }

    // Cities can not be placed next to another city
    else if (tile === 'city' || tile === 'capital city') {
      filter = t =>
        // Not reserved
        notReserved(t) &&
        // Not adjacent to another city
        !self
          .neighbors(t)
          .filter(
            neighbor =>
              neighbor.type === 'city' || neighbor.type === 'capital city'
          ).length;
    }

    // Greeneries have to be placed next to an existing player's tile if possible, otherwise anywhere
    if (tile === 'greenery') {
      // Spaces adjacent to player's tiles
      const adjacentSites = uniq(
        this.getField()
          .flat()
          // Get board tiles owned by player
          .filter(t => t.player === player.number)
          // Get neighbors
          .map(t => this.neighbors(t))
          .flat()
          // Remove any that are already placed or reserved
          .filter(t => !t.name && notReserved(t))
      );

      return (adjacentSites.length ? adjacentSites : this.getField().flat())
        .filter(
          t =>
            // Not reserved
            notReserved(t) &&
            // Not occupied
            !t.name
        )
        .map(t => t.id);
    }

    // Any other tile
    else {
      return this.getField()
        .flat()
        .filter(
          t =>
            // Not occupied
            // TODO: handle markers
            !t.name &&
            // Passes the filter
            filter(t)
        )
        .map(t => t.id);
    }
  }

  /**
   * Get a tile from a tile id
   *
   * @param {number} id
   */
  tileFromId(id) {
    const coords = this.idToCoords(id);
    return this.getField()[coords.y][coords.x];
  }

  /**
   * Get the array coordinates of the id
   * @param {number} id
   */
  idToCoords(id) {
    let x = +id;
    let y = 0;

    for (let s = 5, d = 1; x >= s; x -= s, s += d, y++) {
      if (s >= 9) {
        d = -1;
      }
    }
    return { x, y };
  }

  /**
   * Return adjacent tiles
   *
   * @param {Tile} tile Tile to get neighbors of
   */
  neighbors(tile) {
    const neighbors = [];
    const { x, y } = { ...this.idToCoords(tile.id) };
    const field = this.getField();

    // Grab top neighbors
    if (y > 0) {
      // Upper rows
      if (field[y].length > field[y - 1].length) {
        // Top left
        if (x > 0) {
          neighbors.push(field[y - 1][x - 1]);
        }
        // Top right
        if (x < field[y].length - 1) {
          neighbors.push(field[y - 1][x]);
        }
      }

      // Lower rows
      if (field[y].length < field[y - 1].length) {
        // Top left
        neighbors.push(field[y - 1][x]);
        // Top right
        neighbors.push(field[y - 1][x + 1]);
      }
    }

    // Left
    if (x > 0) {
      neighbors.push(field[y][x - 1]);
    }
    // Right
    if (x < field[y].length - 1) {
      neighbors.push(field[y][x + 1]);
    }

    // Grab bottom neighbors
    if (y < field.length - 1) {
      // Upper rows
      if (field[y].length < field[y + 1].length) {
        // Bottom left
        neighbors.push(field[y + 1][x]);
        // Bottom right
        neighbors.push(field[y + 1][x + 1]);
      }

      // Lower rows
      if (field[y].length > field[y + 1].length) {
        // Bottom left
        if (x > 0) {
          neighbors.push(field[y + 1][x - 1]);
        }
        // Bottom right
        if (x < field[y].length - 1) {
          neighbors.push(field[y + 1][x]);
        }
      }
    }

    return neighbors;
  }

  /**
   * Perform an action in player order
   *
   * @param {Function} func Action to perform in player order
   */
  forEachPlayerOrder(func) {
    for (
      let i = this.startingPlayer - 1, start = true;
      start || i !== this.startingPlayer - 1;
      i = i >= this.players.length - 1 ? 0 : i + 1, start = false
    ) {
      func(this.players[i], i);
    }
  }

  /**
   * Return the first player that matches a condition, in player order
   *
   * @param {Function} func Condition to perform in player order
   */
  findPlayerOrder(func) {
    for (
      let i = this.startingPlayer - 1, start = true;
      start || i !== this.startingPlayer - 1;
      i = i >= this.players.length - 1 ? 0 : i + 1, start = false
    ) {
      if (func(this.players[i], i)) {
        return this.players[i];
      }
    }
  }

  /**
   * Helper method to increase/decrease the card's resource
   *
   * @param {Player} player Player doing the action
   * @param {Card} card Card to change
   */
  cardResource(player, card) {
    const playerCard = player.cards.hand
      .concat(player.cards.active)
      .concat(player.cards.corp)
      .find(c => c.card === card.number);

    return (playerCard && playerCard.resource) || 0;
  }

  /**
   * Check if the requirements are met in order to play the card
   *
   * @param {Player} player The player
   * @param {object} action The action or card to verify
   * @returns Validation object with the status of whether or not the card meets the requirements
   */
  meetsRequirements(player, card, cardStore) {
    const result = { valid: true, msg: [] };

    // Check requirements
    if (card.restriction) {
      const val = card.restriction.value;
      const max = card.restriction.max;

      // Check parameters
      if (card.restriction.param) {
        const param = card.restriction.param;
        const suffix = { oxygen: '%', venus: '%', temperature: '°C' };
        const modifier =
          (player.rates.requirement[param] || 0) *
          (param === 'temperature' ? 2 : 1);
        if (
          (!max && this.params[param] + modifier < val) ||
          (max && this.params[param] - modifier > val)
        ) {
          result.valid = false;
          result.msg.push(
            `Requires ${max ? 'at most' : 'at least'} ${val}${
              suffix[param] || ''
            }${param === 'temperature' ? '' : ` ${param}`}`
          );
        }
      }

      // Check tags
      if (card.restriction.tag) {
        const tags = Array.isArray(card.restriction.tag)
          ? card.restriction.tag
          : [card.restriction.tag];
        // Includes ? tags, if applicable
        if (tags.some(t => player.tags[t] + (player.tags.any || 0) < val)) {
          result.valid = false;
          result.msg.push(
            `Requires ${val} ${tags.join(', ')} tag${val > 1 ? 's' : ''}`
          );
        }
      }

      // Check tiles
      if (card.restriction.tile) {
        const tile = card.restriction.tile;
        const tiles = this.field
          .flat()
          .concat(Object.values(this.offMars))
          .filter(
            t =>
              t.type === tile || (tile === 'city' && t.type === 'capital city')
          );
        const modifier = player.rates.requirement.ocean || 0;
        const actual =
          tile === 'ocean' || card.restriction.anyone
            ? tiles.length
            : tiles.filter(t => t.player === player.number);
        if (
          (!max && actual + modifier < val) ||
          (max && actual - modifier > val)
        ) {
          result.valid = false;
          result.msg.push(`Requires ${val} ${tile} tile${val > 1 ? 's' : ''}`);
        }
      }

      // Check production
      if (card.restriction.production) {
        const prod = card.restriction.production;
        if (player.production[prod] < val) {
          result.valid = false;
          result.msg.push(`Requires ${val} ${prod} production`);
        }
      }

      // Check resources
      if (card.restriction.resource) {
        // Special case when resource is TR
        if (card.restriction.resource === 'tr') {
          if (player.tr < val) {
            result.valid = false;
            result.msg.push(`Requires ${val} Terraform Rating`);
          }
        }
        // Standard resources
        else if (
          [
            'megacredit',
            'steel',
            'titanium',
            'plant',
            'power',
            'heat'
          ].includes(card.restriction.resource) &&
          player.resources[card.restriction.resource] < val
        ) {
          result.valid = false;
          result.msg.push(
            `Requires ${val} ${card.restriction.resource} resources`
          );
        }
        // Anything else is treated as resources on cards
        else if (
          player.cards.active
            .concat(player.cards.corp)
            .filter(c => c.resource === card.restriction.resource)
            .reduce((sum, c) => sum + c.resource, 0) < val
        ) {
          result.valid = false;
          result.msg.push(
            `Requires ${val} ${this.restriction.resource} resources on cards`
          );
        }
      }
    }

    this.actionPlayable(card, player, cardStore, result);

    return result;
  }

  actionPlayable(action, player, cardStore, result = { valid: true, msg: [] }) {
    const translate = r => ({ megacredit: 'M€', power: 'energy' }[r] || r);
    const standardResources = [
      'megacredit',
      'steel',
      'titanium',
      'plant',
      'power',
      'heat'
    ];
    const isCard = ['Automated', 'Active', 'Event', 'Prelude'].includes(
      action.constructor.name
    );

    const checkCardResources = (p, r) => {
      const players = Array.isArray(p) ? p : [p];

      if (
        players.every(
          p =>
            // Player doesn't have a card in play that can accept one
            !new Player(p).allActionableCards
              .map(card => cardStore.get(card.card))
              .some(card => card?.resource === r)
        ) &&
        // Card actions are exempt from this requirement (i.e. playing a card)
        !isCard
      ) {
        result.valid = false;
        result.msg.push(
          `Requires at least one card in play ${
            players.length > 1 ? 'by ANY PLAYER ' : ''
          }that can accept ${translate(r)} resources`
        );
      }
    };

    // Validate resources
    if (action.resources && isPlainObject(action.resources)) {
      Object.keys(action.resources).forEach(r => {
        // The action is on all players
        if (r === 'anyone') {
          Object.keys(action.resources.anyone).forEach(ar => {
            // Negative standard resources on other players is always optional, i.e. should not block the action

            // Check card resources, i.e. resource is NOT one of the standard resources
            if (!standardResources.includes(ar)) {
              checkCardResources(this.players, ar);
            }
          });
        } else {
          // Check negative resources
          if (
            standardResources.includes(r) &&
            action.resources[r] < 0 &&
            player.resources[r] + action.resources[r] < 0
          ) {
            result.valid = false;
            result.msg.push(`Not enough ${translate(r)} resources`);
          }

          // Check card resources, i.e. resource is NOT one of the standard resources
          if (!standardResources.includes(r)) {
            checkCardResources(this.players, r);
          }
        }
      });
    }

    // Validate production
    if (action.production && isPlainObject(action.production)) {
      const checkProduction = (p, r, anyone = false) => {
        // Check negative production
        if (
          action.production[r] < 0 &&
          player.production[r] + action.production[r] < r === 'megacredit'
            ? -5
            : 0
        ) {
          result.valid = false;
          result.msg.push(
            anyone
              ? `Requires at least one player with ${translate(r)} production`
              : `Not enough ${translate(r)} production`
          );
        }
      };

      Object.keys(action.production).forEach(r => {
        // The action is on all players
        if (r === 'anyone') {
          Object.keys(action.production.anyone).forEach(ar =>
            checkProduction(this.players, ar)
          );
        } else {
          checkProduction(player, r);
        }
      });
    }

    // Check tile placement
    if (action.tile) {
      const tiles = (
        Array.isArray(action.tile) ? action.tile : [action.tile]
      ).map(tile => (isPlainObject(tile) ? tile : { tile }));

      if (
        !tiles.every(
          t => this.findPossibleTiles(t.tile, player, t.filter).length
        )
      ) {
        result.valid = false;
        result.msg.push('Cannot place tile');
      }
    }
  }
}

export default SharedGame;
