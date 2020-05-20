import { shuffle } from 'lodash';

const paramStats = {
  temp: {
    start: -30,
    max: 8,
    step: 2
  },
  oxygen: {
    max: 14
  },
  venus: {
    max: 30,
    step: 2
  },
  ocean: {
    max: 0,
    step: -1,
    start: 9
  }
};

class Game {
  deck = [];
  discard = [];
  corps = [];
  preludes = [];
  players = [];
  turn = 0;
  startingPlayer = 0;
  params = {
    temp: -30,
    oxygen: 0,
    ocean: 9,
    generation: 1,
    venus: 0
  };

  cards = {};

  constructor(cardStore) {
    this.deck = shuffle(Object.keys(cardStore.project));
    this.corps = shuffle(Object.keys(cardStore.corporation));
    this.preludes = shuffle(Object.keys(cardStore.prelude));
  }

  drawCard(player) {
    // Reshuffle draw deck
    if (this.deck.length === 0) {
      this.deck = shuffle(this.discard);
      this.discard = [];
    }

    player.cards.hand.push(this.deck.shift());
  }

  param(param, player) {
    if (
      paramStats[param] !== undefined &&
      (this.params[param] < paramStats[param].max ||
        (paramStats[param].step < 0 &&
          this.params[param] > paramStats[param].max))
    ) {
      this.params[param] += paramStats[param].step || 1;
      player.tr++;
    }
  }
}

export default Game;
