import { isFunction, isPlainObject, times } from 'lodash';

export default class Card {
  number; // Unique card number
  title; // Card title
  tags; // Array of tags
  desc; // Description of card
  flavor; // Flavor text
  set = 'base'; // Game set, e.g. corporate era, preludes, venus next, ...
  landscape = false; // Orientation of the card
  todo = false; // Marks a card as "unfinished"
  action; // Function to handle the action of the card

  constructor(props) {
    Object.assign(this, props);
  }

  /**
   * Perform the standard action. The standard action is typically changing
   * resources/production, placing tiles, drawing cards, and increasing global
   * parameters (temperature, oxygen, venus), followed by any custom actions
   * defined on the card.
   *
   * @param {Player} player The player performing the standard action
   * @param {Game} game The game
   * @param {*} done Callback when the actions are complete
   */
  standardAction(player, game, done) {
    // Handle resources
    if (this.resources) {
      if (isFunction(this.resources)) {
        // TODO: do function
      } else {
        Object.keys(this.resources).forEach(r =>
          game.resources(player, r, this.resources[r])
        );
      }
    }

    // Handle production
    if (this.production) {
      if (isFunction(this.production)) {
        // TODO: do function
      } else {
        Object.keys(this.production).forEach(p =>
          game.production(player, p, this.production[p])
        );
      }
    }

    // Handle TR
    if (this.tr) {
      game.tr(player, this.tr);
    }

    // Handle cards
    if (this.drawCard) {
      const opts = {
        reveal: false,
        filter: () => true,
        num: this.drawCard.num || 1,
        log: `${this.drawCard.num} cards`,
        icon: {}
      };

      // Reveal cards with tags
      if (this.drawCard.tag) {
        opts.reveal = true;
        opts.filter = card => card.tags.includes(this.drawCard.tag);
        opts.log = `${this.drawCard.tag} cards`;
        opts.icon = { tag: this.drawCard.tag };
      }

      // Reveal cards with resources
      if (this.drawCard.resource) {
        opts.reveal = true;
        opts.filter = card => card.resource === this.drawCard.resource;
        opts.log = `${this.drawCard.resource} cards`;
        opts.icon = { resource: this.drawCard.resource };
      }

      // Reveal cards if needed, otherwise just draw the cards
      if (opts.reveal) {
        game.keepSelected(
          player,
          game.revealCards(player, opts.filter, opts.num, opts.log, opts.icon)
        );
      } else {
        times(opts.num, () => game.drawCard(player));
      }
    }

    // Now begins the actions with callbacks
    let chain = [];
    const callNextInChain = i => () => {
      return chain[i]
        ? chain[i](player, game, callNextInChain(i + 1))
        : done && done();
    };

    // Handle params
    if (this.param) {
      const params = Array.isArray(this.param) ? this.param : [this.param];
      chain = [
        ...chain,
        ...params.map(param => i =>
          game.param(player, param, callNextInChain(i + 1))
        )
      ];
    }

    // Handle tiles
    if (this.tile) {
      const tiles = (Array.isArray(this.tile)
        ? this.tile
        : [this.tile]
      ).map(tile => (isPlainObject(tile) ? tile : { tile }));

      // TODO: Handle special tiles and placement restrictions

      chain = [
        ...chain,
        ...tiles.map(tile => i =>
          game.promptTile(player, tile, callNextInChain(i + 1), tile.filter)
        )
      ];
    }

    // Handle custom card action
    if (this.action) {
      chain.push(this.action);
    }

    // Start the chain
    callNextInChain(0)();
  }
}
