import { isPlainObject } from 'lodash';
import Card from './Card';

export default class Project extends Card {
  cost; // Cost to fund
  restriction; // Restrictions in order to play
  vp; // Victory points, or function for variable VPs
  emoji; // Emoji of card, used for card art
  layout; // Layout of the car

  constructor(props) {
    super(props);

    Object.assign(this, props);
  }

  /**
   * Any card specific requirements for play excluding global restrictions and resource/production requirements.
   */
  canPlay() {
    return { valid: true };
  }

  /**
   * Check if the requirements are met in order to play the card
   *
   * @param {Player} player The player
   * @param {Game} game The game
   * @returns Validation object with the status of whether or not the card meets the requirements
   */
  meetsRequirements(player, game) {
    const result = { valid: true };

    // Check requirements
    if (this.restriction) {
      const val = this.restriction.value;
      const max = this.restriction.max;

      // Check parameters
      if (this.restriction.param) {
        const param = this.restriction.param;
        const suffix = { oxygen: '%', venus: '%', temperature: '°C' };
        if (
          (!max && game.params[param] < val) ||
          (max && game.params[param] > val)
        ) {
          result.valid = false;
          result.msg = `Requires ${max ? 'at most' : 'at least'} ${val}${
            suffix[param] || ''
          }${param === 'temperature' ? '' : ` ${param}`}`;
        }
      }

      // Check tags
      if (this.restriction.tag) {
        const tags = Array.isArray(this.restriction.tag)
          ? this.restriction.tag
          : [this.restriction.tag];
        // Includes ? tags, if applicable
        if (tags.some(t => player.tags[t] + (player.tags.any || 0) < val)) {
          result.valid = false;
          result.msg = `Requires ${val} ${tags.join(', ')} tag${
            val > 1 ? 's' : ''
          }`;
        }
      }

      // Check tiles
      if (this.restriction.tile) {
        const tile = this.restriction.tile;
        const tiles = game.field
          .flat()
          .concat(Object.values(game.offMars))
          .filter(
            t =>
              t.type === tile || (tile === 'city' && t.type === 'capital city')
          );
        const actual =
          tile === 'ocean' || this.restriction.anyone
            ? tiles.length
            : tiles.filter(t => t.player === player.number);
        if ((!max && actual < val) || (max && actual > val)) {
          result.valid = false;
          result.msg = `Requires ${val} ${tile} tile${val > 1 ? 's' : ''}`;
        }
      }

      // Check production
      if (this.restriction.production) {
        const prod = this.restriction.production;
        if (player.production[prod] < val) {
          result.valid = false;
          result.msg = `Requires ${val} ${prod} production`;
        }
      }

      // Check resources
      if (this.restriction.resource) {
        // Special case when resource is TR
        if (this.restriction.resource === 'tr') {
          if (player.tr < val) {
            result.valid = false;
            result.msg = `Requires ${val} Terraform Rating`;
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
          ].includes(this.restriction.resource) &&
          player.resources[this.restriction.resource] < val
        ) {
          result.valid = false;
          result.msg = `Requires ${val} ${this.restriction.resource} resources`;
        }
        // Anything else is treated as resources on cards
        else if (
          player.cards.active
            .concat(player.cards.corp)
            .filter(c => c.resource === this.restriction.resource)
            .reduce((sum, c) => sum + c.resource, 0) < val
        ) {
          result.valid = false;
          result.msg = `Requires ${val} ${this.restriction.resource} resources on cards`;
        }
      }
    }

    // Check negative resources
    if (this.resources && isPlainObject(this.resources)) {
      Object.keys(this.resources).forEach(r => {
        if (
          this.resources[r] < 0 &&
          this.player.resources[r] + this.resources[r] < 0
        ) {
          result.valid = false;
          result.msg = `Not enough ${
            { megacredit: 'M€', power: 'energy' }[r] || r
          } resources`;
        }
      });
    }

    // Check negative production
    if (this.production && isPlainObject(this.production)) {
      Object.keys(this.production).forEach(r => {
        if (
          this.production[r] < 0 &&
          ((r === 'megacredit' &&
            this.player.production.megacredit + this.production.megacredit <
              -5) ||
            this.player.production[r] + this.production[r] < 0)
        ) {
          result.valid = false;
          result.msg = `Not enough ${
            { megacredit: 'M€', power: 'energy' }[r] || r
          } production`;
        }
      });
    }

    // TODO: Handle tiles
    // if (this.tile) {
    //   const tiles = (Array.isArray(this.tile)
    //     ? this.tile
    //     : [this.tile]
    //   ).map(tile => (isPlainObject(tile) ? tile : { tile }));

    // }

    return result;
  }
}
