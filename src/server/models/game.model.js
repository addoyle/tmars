import fs from 'fs';
import { shuffle } from 'lodash';

export default class Game {
  deck = [];
  discard = [];
  corps = [];
  preludes = [];
  players = [];
  turn = 0;
  startingPlayer = 0;

  constructor() {
    console.log('Initializing TMars...');

    // Load projets
    this.deck = shuffle(
      fs
        .readdirSync(`${__dirname}/../../cards/project`)
        .map(f => require(`../../cards/project/${f}`).default)
    );
    console.log(`${this.deck.length} projects loaded`);

    // Load corps
    this.corps = shuffle(
      fs
        .readdirSync(`${__dirname}/../../cards/corp`)
        .map(f => require(`../../cards/corp/${f}`).default)
    );
    console.log(`${this.corps.length} corps loaded`);

    // Load preludes
    this.preludes = shuffle(
      fs
        .readdirSync(`${__dirname}/../../cards/prelude`)
        .map(f => require(`../../cards/prelude/${f}`).default)
    );
    console.log(`${this.preludes.length} preludes loaded`);
  }

  drawCard(player) {
    if (player >= this.players.length) {
      throw new Error('Invalid player');
    }

    if (this.deck.length === 0) {
      this.deck = shuffle(this.discard);
      this.discard = [];
    }

    this.players[player].cards.hand.push(this.deck.shift());
  }
}
