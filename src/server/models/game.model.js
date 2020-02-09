import fs from 'fs';
import path from 'path';

export default class Game {
  deck = [];
  corps = [];
  preludes = [];
  players = [];
  turn = 0;
  startingPlayer = 0;

  constructor() {
    console.log('Initializing TMars...');

    // Load cards
    this.deck = fs.readdirSync(`${__dirname}/../../cards/projects`)
      .map(f => require(`../../cards/projects/${f}`));
    console.log(`${this.deck.length} projects loaded`);

    // Load corps
    this.corps = fs.readdirSync(`${__dirname}/../../cards/corps`)
      .map(f => require(`../../cards/corps/${f}`));
    console.log(`${this.corps.length} corps loaded`);

    // Load preludes
    // TODO
    // this.preludes = fs.readdirSync(`${__dirname}/../../cards/preludes`)
    //   .map(f => require(`../../cards/preludes/${f}`));
    console.log(`${this.preludes.length} preludes loaded`);
  }
}