import fs from 'fs';

export default class Game {
  deck = [];
  corps = [];
  preludes = [];
  players = [];
  turn = 0;
  startingPlayer = 0;

  constructor() {
    console.log('Initializing TMars...');

    // Load projets
    this.deck = fs
      .readdirSync(`${__dirname}/../../cards/project`)
      .map(f => require(`../../cards/project/${f}`).default);
    console.log(`${this.deck.length} projects loaded`);

    // Load corps
    this.corps = fs
      .readdirSync(`${__dirname}/../../cards/corp`)
      .map(f => require(`../../cards/corp/${f}`).default);
    console.log(`${this.corps.length} corps loaded`);

    // Load preludes
    this.preludes = fs
      .readdirSync(`${__dirname}/../../cards/prelude`)
      .map(f => require(`../../cards/prelude/${f}`).default);
    console.log(`${this.preludes.length} preludes loaded`);
  }
}
