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
   * Any card specific requirements for play excluding global restrictions.
   *
   * E.g. negative power production requires the player to have at least 1 power production
   */
  canPlay() {
    return { valid: true };
  }

  meetsRequirements(player, game) {
    const result = { valid: true };

    // No restriction, we're good!
    if (!this.restriction) {
      return result;
    }

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
          t => t.type === tile || (tile === 'city' && t.type === 'capital city')
        );
      const actual =
        tile === 'ocean' || this.restriction.anyone
          ? tiles.length
          : tiles.filter(t => t.player === player.number);
      if (actual < val) {
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
      if (this.restriction.resource === 'tr' && player.tr < val) {
        result.valid = false;
        result.msg = `Requires ${val} Terraform Rating`;
      }
      // Standard resources
      else if (
        ['megacredit', 'steel', 'titanium', 'plant', 'power', 'heat'].includes(
          this.restriction.resource
        ) &&
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

    return result;
  }
}
