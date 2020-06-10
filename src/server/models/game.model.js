import { shuffle } from 'lodash';
import { normalize } from '../util';
import Tharsis from '../../shared/boards/Tharsis';
import Hellas from '../../shared/boards/Hellas';
import Elysium from '../../shared/boards/Elysium';
import Log from './log.model';
import { startCase } from 'lodash';
import LogService from '../services/log.service';

const paramStats = {
  temperature: {
    start: -30,
    max: 8,
    step: 2,
    rewards: {
      [-24]: player => player.production.heat++,
      [-20]: player => player.production.heat++,
      // TODO: place an ocean
      0: (player, game) => game.param('ocean', player)
    }
  },
  oxygen: {
    max: 14,
    rewards: {
      8: (player, game) => game.param('temperature', player)
    }
  },
  venus: {
    max: 30,
    step: 2,
    rewards: {
      8: (player, game) => game.drawCard(player),
      16: player => player.tr++
    }
  },
  ocean: {
    max: 0,
    step: -1,
    start: 9,
    rewards: {}
  }
};

class Game {
  id;
  sets = [];
  players = [];
  turn = 0;
  startingPlayer = 0;
  params = {
    temperature: -30,
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

  cards = {
    deck: [],
    discard: [],
    corps: [],
    preludes: []
  };
  cardStore;

  queue = [];

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

    // Assign the player numbers
    this.players.forEach((player, i) => (player.number = i + 1));

    // Filter out non-used cards and shuffle decks
    this.cards.deck = shuffle(
      Object.values(this.cardStore.project)
        .filter(card => {
          const answer =
            card.set === 'base' ||
            (Array.isArray(card.set) ? card.set : [card.set]).every(set =>
              this.sets.includes(set)
            );
          return answer;
        })
        .map(card => ({ card: normalize(card.number) }))
    );
    this.cards.corps = shuffle(
      Object.values(this.cardStore.corporation)
        .filter(
          corp =>
            corp.number !== '000' &&
            (corp.set === 'base' ||
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
    const startLog = new Log(0, [
      'Please select 1 ',
      { corporation: 'Corporation' }
    ]);
    if (this.sets.includes('prelude')) {
      startLog.body.push(', 2 ');
      startLog.body.push({ prelude: 'Preludes' });
      startLog.body.push(', ');
    }
    startLog.body.push('and buy cards for your ');
    startLog.body.push({ project: 'starting hand' });
    startLog.body.push('.');
    this.log.push(startLog);

    // Choose starting player
    this.startingPlayer = Math.floor(Math.random() * this.players.length) + 1;
    this.log.push(
      new Log(this.startingPlayer, ' will be your starting player!')
    );

    // Deal out corps
    for (let i = 0; i < 2; i++) {
      this.forEachPlayerOrder(player =>
        player.cards.corp.push(this.cards.corps.shift())
      );
    }
    // Include beginner corp
    this.players.forEach(player => player.cards.corp.push({ card: '000' }));

    // Deal out starting projects
    for (let i = 0; i < 10; i++) {
      this.forEachPlayerOrder(player => this.drawCard(player, 'buy'));
    }

    // Deal out preludes
    for (let i = 0; i < 4; i++) {
      this.forEachPlayerOrder(player =>
        player.cards.prelude.push(this.cards.preludes.shift())
      );
    }

    // Solo game, starts at TR 14
    if (this.players.length === 1) {
      this.players[0].tr = 14;
    } else {
      this.players.forEach(player => (player.tr = 20));
    }
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
  applyCorp(player) {
    const corp = this.cardStore.corporation[player.cards.corp[0].card];
    Object.assign(player.resources, corp.starting.resources || {});
    Object.assign(player.production, corp.starting.production || {});
    (corp.tags || []).forEach(tag => player.tags[tag]++);
  }

  /**
   * Add a prelude to a player
   *
   * @param {Player} player
   * @param {object} prelude
   */
  applyPreludes(player) {
    player.cards.prelude.forEach(card => {
      const prelude = this.cardStore.prelude[card.card];
      (prelude.tags || []).forEach(tag => player.tags[tag]++);

      // Perform prelude specific actions
      prelude.serverAction(player, this);
    });
  }

  revealCards(player, revealFilter, size, label, icon) {
    const revealed = [];
    let keep = [];

    // Draw cards until the number of matching cards reaches the expected size
    while (
      (keep = revealed
        .map(card => this.cardStore.project[card.card])
        .filter(revealFilter)
        .map(card => ({
          card: normalize(card.number)
        }))).length < size
    ) {
      revealed.push(this.cards.deck.shift());
    }

    // Select the cards that will move to the hand
    revealed.forEach(card => {
      if (keep.map(({ card }) => card).includes(card.card)) {
        card.select = true;
      }
    });

    // Add the cards we were looking for to hand, and discard the rest
    player.cards.hand = player.cards.hand.concat(keep);
    this.cards.discard = this.cards.discard.concat(
      revealed.filter(
        ({ card }) => !keep.map(({ card }) => card).includes(card)
      )
    );

    // Add a log for users to see revealed cards
    LogService.pushLog(
      this.id,
      new Log(player.number, [
        ` searched for ${size} `,
        icon,
        ` ${label} and has `,
        { reveal: revealed },
        '.'
      ])
    );
  }

  /**
   * Bump up the param and give the player the rewards
   *
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

      // Handle rewards if a param reaches a certain threshold
      const rewardAction = paramStats[param].rewards[this.params[param]];
      if (rewardAction) {
        LogService.pushLog(
          this.id,
          new Log(player.number, [
            ' got a reward from raising ',
            { param },
            ` ${startCase(param)}!`
          ])
        );
        rewardAction(player, this);
      }
    }
  }

  beginActionPhase() {
    this.phase = 'action';
    this.turn = this.startingPlayer;
  }

  forEachPlayerOrder(func) {
    for (
      let i = this.startingPlayer - 1, start = true;
      start || i !== this.startingPlayer - 1;
      i = i >= this.players.length - 1 ? 0 : i + 1, start = false
    ) {
      func(this.players[i], i);
    }
  }

  export() {
    // eslint-disable-next-line no-unused-vars
    const { cards, cardStore, log, ...strippedGame } = this;
    return strippedGame;
  }
}

export default Game;
