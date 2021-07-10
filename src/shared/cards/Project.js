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
    const result = { valid: true, msg: [] };

    // Check requirements
    if (this.restriction) {
      const val = this.restriction.value;
      const max = this.restriction.max;

      // Check parameters
      if (this.restriction.param) {
        const param = this.restriction.param;
        const suffix = { oxygen: '%', venus: '%', temperature: '°C' };
        const modifier =
          (player.rates.requirement[param] || 0) *
          (param === 'temperature' ? 2 : 1);
        if (
          (!max && game.params[param] + modifier < val) ||
          (max && game.params[param] - modifier > val)
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
      if (this.restriction.tag) {
        const tags = Array.isArray(this.restriction.tag)
          ? this.restriction.tag
          : [this.restriction.tag];
        // Includes ? tags, if applicable
        if (tags.some(t => player.tags[t] + (player.tags.any || 0) < val)) {
          result.valid = false;
          result.msg.push(
            `Requires ${val} ${tags.join(', ')} tag${val > 1 ? 's' : ''}`
          );
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
        const modifier = player.rates.requirement.ocean || 0;
        const actual =
          tile === 'ocean' || this.restriction.anyone
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
      if (this.restriction.production) {
        const prod = this.restriction.production;
        if (player.production[prod] < val) {
          result.valid = false;
          result.msg.push(`Requires ${val} ${prod} production`);
        }
      }

      // Check resources
      if (this.restriction.resource) {
        // Special case when resource is TR
        if (this.restriction.resource === 'tr') {
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
          ].includes(this.restriction.resource) &&
          player.resources[this.restriction.resource] < val
        ) {
          result.valid = false;
          result.msg.push(
            `Requires ${val} ${this.restriction.resource} resources`
          );
        }
        // Anything else is treated as resources on cards
        else if (
          player.cards.active
            .concat(player.cards.corp)
            .filter(c => c.resource === this.restriction.resource)
            .reduce((sum, c) => sum + c.resource, 0) < val
        ) {
          result.valid = false;
          result.msg.push(
            `Requires ${val} ${this.restriction.resource} resources on cards`
          );
        }
      }
    }

    this.actionPlayable(this, player, game, result);

    return result;
  }
}
