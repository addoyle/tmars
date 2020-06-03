import { shuffle } from 'lodash';
import { normalize } from '../util';
import Tharsis from '../../shared/boards/Tharsis';
import Hellas from '../../shared/boards/Hellas';
import Elysium from '../../shared/boards/Elysium';
import Log from './log.model';
import { startCase } from 'lodash';

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
  sets = [];
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
  variants = {
    draft: false,
    wgt: false
  };
  board = 'Tharsis';
  field = [];
  milestones = [];
  awards = [];
  phase = 'start';

  log = [];

  cardStore;

  /**
   * Constructor
   * @param {CardModel} cardStore
   */
  constructor(cardStore) {
    this.cardStore = cardStore;
  }

  /**
   * Initialize the game
   */
  init() {
    // Show welcome message
    this.log.push(new Log(0, 'Welcome to Terraforming Mars!'));

    // Filter out non-used cards and shuffle decks
    this.cards.deck = shuffle(
      Object.values(this.cardStore.project)
        .filter(
          card =>
            !card.set ||
            (Array.isArray(card.set) ? card.set : [card.set]).every(set =>
              this.sets.includes(set)
            )
        )
        .map(card => ({ card: normalize(card.number) }))
    );
    this.cards.corps = shuffle(
      Object.values(this.cardStore.corporation)
        .filter(
          corp =>
            corp.number !== '000' &&
            (!corp.set ||
              (Array.isArray(corp.set) ? corp.set : [corp.set]).every(set =>
                this.sets.includes(set)
              ))
        )
        .map(card => ({ card: normalize(card.number) }))
    );
    if (this.sets.includes('prelude')) {
      this.cards.preludes = shuffle(
        Object.keys(this.cardStore.prelude).map(card => ({
          card: normalize(card)
        }))
      );
    }

    // Set field
    Object.assign(
      this,
      this.board.toLowerCase() === 'hellas'
        ? Hellas
        : this.board.toLowerCase() === 'elysium'
        ? Elysium
        : Tharsis
    );

    // Tell the users which field they're playing on
    this.log.push(
      new Log(0, [
        `You are terraforming **${startCase(this.board)}**, `,
        {
          tharsis: 'the land of volcanics!',
          hellas: 'the southern wild!',
          elysium: 'the other side of mars!'
        }[this.board.toLowerCase()]
      ])
    );

    // Show helpful message log
    const startLog = new Log(0, ['Please select 1 ', { corp: 'Corporation' }]);
    if (this.sets.includes('prelude')) {
      startLog.body.push(', 2 ');
      startLog.body.push({ prelude: 'Preludes' });
      startLog.body.push(', ');
    }
    startLog.body.push('and buy cards for your ');
    startLog.body.push({ project: 'starting hand' });
    startLog.body.push('.');
    this.log.push(startLog);

    // Deal out corps
    for (let i = 0; i < 2; i++) {
      this.players.forEach(player =>
        player.cards.corp.push(this.cards.corps.shift())
      );
    }
    // Include beginner corp
    this.players.forEach(player => player.cards.corp.push({ card: '000' }));

    // Deal out starting projects
    for (let i = 0; i < 10; i++) {
      this.players.forEach(player => this.drawCard(player, 'buy'));
    }

    // Deal out preludes
    for (let i = 0; i < 4; i++) {
      this.players.forEach(player =>
        player.cards.prelude.push(this.cards.preludes.shift())
      );
    }

    // Solo game, starts at TR 14
    if (this.players.length === 1) {
      this.players[0].tr = 14;
    } else {
      this.players.forEach(player => (player.tr = 20));
    }

    // Choose starting player
    this.startingPlayer = Math.floor(Math.random() * this.players.length) + 1;

    // Log the starting player
    this.log.push(
      new Log(this.startingPlayer, ' will be your starting player!')
    );
  }

  /**
   * Draw a project card for a player
   *
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
  setCorp(player, corp) {
    player.cards.corp = [corp];
    const corpCard = this.cardStore.corporation[corp];
    Object.assign(player.resources, corpCard.starting.resources || {});
    Object.assign(player.production, corpCard.starting.production || {});
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

  export(activePlayer) {
    // eslint-disable-next-line no-unused-vars
    const { cards, cardStore, ...strippedGame } = this;
    return {
      ...strippedGame,
      players: strippedGame.players.map((player, i) => ({
        ...player,
        cards:
          i === activePlayer - 1
            ? player.cards
            : {
                active: player.cards.active,
                automated: player.cards.automated,
                event: player.cards.event
              }
      }))
    };
  }
}

export default Game;
