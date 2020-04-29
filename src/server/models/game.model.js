import fs from 'fs';
import { shuffle } from 'lodash';
import { normalize } from '../util';

export default class Game {
  deck = [];
  discard = [];
  corps = [];
  preludes = [];
  players = [];
  turn = 0;
  startingPlayer = 0;

  cards = {};

  constructor() {
    console.log('Initializing TMars...');

    this.loadCards().then(() => {
      this.deck = shuffle(this.cards.project);
      this.corps = shuffle(this.cards.corporation);
      this.preludes = shuffle(this.cards.prelude);
    });
  }

  loadCards() {
    return Promise.all([
      // Load projects
      ...fs
        .readdirSync(`${__dirname}/../../cards/project`)
        .map(f => import(`../../cards/project/${f}`)),

      // Load corps
      ...fs
        .readdirSync(`${__dirname}/../../cards/corp`)
        .map(f => import(`../../cards/corp/${f}`)),

      // Load preludes
      ...fs
        .readdirSync(`${__dirname}/../../cards/prelude`)
        .map(f => import(`../../cards/prelude/${f}`))
    ]).then(res => {
      this.cards = res
        .map(card => card.default.default)
        .reduce(
          (cards, card) => {
            cards[
              Object.getPrototypeOf(Object.getPrototypeOf(card)).constructor
                .name === 'Project'
                ? 'project'
                : card.constructor.name.toLowerCase()
            ][normalize(card.number)] = card;

            return cards;
          },
          { project: {}, corporation: {}, prelude: {} }
        );
    });
  }

  drawCard(player) {
    if (player >= this.players.length) {
      throw new Error('Invalid player');
    }

    // Reshuffle draw deck
    if (this.deck.length === 0) {
      this.deck = shuffle(this.discard);
      this.discard = [];
    }

    this.players[player].cards.hand.push(this.deck.shift());
  }
}
