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
  cards = {
    deck: [],
    discard: [],
    corps: [],
    preludes: []
  };
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

  cardStore;

  /**
   * Constructor
   * @param {CardModel} cardStore
   */
  constructor(cardStore) {
    this.cards.deck = shuffle(Object.keys(cardStore.project));
    this.cards.corps = shuffle(Object.keys(cardStore.corporation));
    this.cards.preludes = shuffle(Object.keys(cardStore.prelude));
    this.cardStore = cardStore;
  }

  /**
   * Draw a card for a player
   * @param {Player} player
   * @param {string} pile
   */
  drawCard(player, pile = 'hand') {
    // Reshuffle draw deck
    if (this.cards.deck.length === 0) {
      this.cards.deck = shuffle(this.cards.discard);
      this.cards.discard = [];
    }

    player.cards[pile].push(this.cards.deck.shift());
  }

  /**
   * Set the corp on a player
   * @param {Player} player
   */
  setCorp(player) {
    player.corp = this.cards.corps.shift();
    const corp = this.cardStore.corporation[player.corp];
    Object.assign(player.resources, corp.starting.resources || {});
    Object.assign(player.production, corp.starting.production || {});
    (corp.tags || []).forEach(tag => player.tags[tag]++);
  }

  /**
   * Bump up the param and give the player the rewards
   * @param {string} param
   * @param {Player} player
   */
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

  export() {
    // eslint-disable-next-line no-unused-vars
    const { cards, ...strippedGame } = this;
    return strippedGame;
  }
}

export default Game;
