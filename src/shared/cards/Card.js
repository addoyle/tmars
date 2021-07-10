import { isPlainObject } from 'lodash';

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

  actionPlayable(action, player, game, result) {
    // Check negative resources
    if (action.resources && isPlainObject(action.resources)) {
      Object.keys(action.resources).forEach(r => {
        if (
          action.resources[r] < 0 &&
          player.resources[r] + action.resources[r] < 0
        ) {
          result.valid = false;
          result.msg.push(
            `Not enough ${
              { megacredit: 'M€', power: 'energy' }[r] || r
            } resources`
          );
        }
      });
    }

    // Check negative production
    if (action.production && isPlainObject(action.production)) {
      Object.keys(action.production).forEach(r => {
        if (
          action.production[r] < 0 &&
          player.production[r] + action.production[r] < r === 'megacredit'
            ? -5
            : 0
        ) {
          result.valid = false;
          result.msg.push(
            `Not enough ${
              { megacredit: 'M€', power: 'energy' }[r] || r
            } production`
          );
        }
      });
    }

    // Check tile placement
    if (action.tile) {
      const tiles = (Array.isArray(action.tile)
        ? action.tile
        : [action.tile]
      ).map(tile => (isPlainObject(tile) ? tile : { tile }));

      if (
        !tiles.every(
          t => game.findPossibleTiles(t.tile, player, t.filter).length
        )
      ) {
        result.valid = false;
        result.msg.push('Cannot place tile');
      }
    }
  }
}
