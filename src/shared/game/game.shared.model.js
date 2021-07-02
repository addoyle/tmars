import { uniq } from 'lodash';

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
}

export default SharedGame;
