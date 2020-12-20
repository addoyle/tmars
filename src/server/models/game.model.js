import { shuffle, isString } from 'lodash';
import { normalize } from '../util';
import Tharsis from '../../shared/boards/Tharsis';
import Hellas from '../../shared/boards/Hellas';
import Elysium from '../../shared/boards/Elysium';
import Log from './log.model';
import { startCase } from 'lodash';
import LogService from '../services/log.service';
import SharedGame from '../../shared/game/game.shared.model';

const paramStats = {
  temperature: {
    start: -30,
    max: 8,
    step: 2,
    rewards: {
      [-24]: (player, game) => game.production(player, 'heat', 1),
      [-20]: (player, game) => game.production(player, 'heat', 1),
      // TODO: place an ocean
      0: (player, game, done) => game.promptTile(player, 'ocean', done)
    }
  },
  oxygen: {
    max: 14,
    rewards: {
      8: (player, game, done) => game.param(player, 'temperature', done)
    }
  },
  venus: {
    max: 30,
    step: 2,
    rewards: {
      8: (player, game) => game.drawCard(player),
      16: (player, game) => game.tr(player, 1)
    }
  },
  ocean: {
    max: 0,
    step: -1,
    start: 9,
    rewards: {}
  }
};

class Game extends SharedGame {
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
    wgt: false,
    trSolo: false
  };
  board = 'Tharsis';
  field = [];
  milestones = [];
  awards = [];
  phase = 'start';
  playerStatus;

  offMars = {
    ganymede: {},
    phobos: {},
    torus: {},
    maxwell: {},
    stratopolis: {},
    luna: {},
    dawn: {}
  };

  log = [];

  cards = {
    deck: [],
    discard: [],
    corps: [],
    preludes: []
  };
  cardStore;

  /**
   * Constructor
   * @param {CardModel} cardStore
   */
  constructor(cardStore, game) {
    super();
    this.cardStore = cardStore;

    if (game) {
      Object.assign(this, game);
    }
  }

  /**
   * Initialize the game
   */
  init() {
    // Show welcome message
    this.log.push(new Log(0, 'Welcome to Terraforming Mars!'));

    // Assign the player numbers
    this.players.forEach((player, i) => (player.number = i + 1));

    // Solo game specific rules
    if (this.players.length === 1) {
      const player = this.players[0];

      // Starting TR at 14
      player.tr = 14;

      // Solo games always play with corporate era
      if (!this.sets.includes('corporate')) {
        this.sets.push('corporate');
      }
    }
    // Multi-player game rules
    else {
      this.players.forEach(player => {
        // Starting TR at 20
        player.tr = 20;

        // Non-corporate era starts with 1 production for each resource
        if (!this.sets.includes('corporate')) {
          Object.keys(player.production).forEach(
            p => (player.production[p] = 1)
          );
        }
      });
    }

    // Filter out non-used cards and shuffle project deck
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
    // Do the same for the corp deck
    this.cards.corps = shuffle(
      Object.values(this.cardStore.corporation)
        .filter(
          corp =>
            +corp.number !== 0 &&
            (corp.set === 'base' ||
              (Array.isArray(corp.set) ? corp.set : [corp.set]).every(set =>
                this.sets.includes(set)
              ))
        )
        .map(card => ({ card: normalize(card.number) }))
    );
    // And the prelude deck
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

    // Assign tile ids
    let id = 0;
    this.field.forEach(row => row.forEach(t => (t.id = id++)));

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
      { corp: 'Corporation', drawer: 'corp' }
    ]);
    if (this.sets.includes('prelude')) {
      startLog.body.push(', 2 ');
      startLog.body.push({ prelude: 'Preludes', drawer: 'prelude' });
      startLog.body.push(', ');
    }
    startLog.body.push('and buy cards for your ');
    startLog.body.push({ project: 'starting hand', drawer: 'hand' });
    startLog.body.push('.');
    this.log.push(startLog);

    // Choose starting player
    this.startingPlayer = Math.floor(Math.random() * this.players.length) + 1;
    this.log.push(
      new Log(this.startingPlayer, ' will be your starting player!')
    );

    // Deal out 2 corps to each player
    for (let i = 0; i < 2; i++) {
      this.forEachPlayerOrder(player =>
        player.cards.corp.push(this.cards.corps.shift())
      );
    }
    // Add in beginner corp
    // TODO: make this optional
    this.players.forEach(player => player.cards.corp.push({ card: '000' }));

    // Deal out 10 projects
    for (let i = 0; i < 10; i++) {
      this.forEachPlayerOrder(player => this.drawCard(player, 'buy'));
    }

    // Deal out 4 preludes
    if (this.sets.includes('prelude')) {
      for (let i = 0; i < 4; i++) {
        this.forEachPlayerOrder(player =>
          player.cards.prelude.push(this.cards.preludes.shift())
        );
      }
    }
  }

  /**
   * Draw a project card for a player
   *
   * @param {Player} player
   * @param {string} pile
   * @param {function} done If a callback is set, this was done as a card action
   */
  drawCard(player, pile = 'hand', done) {
    // Reshuffle draw deck
    if (this.cards.deck.length === 0) {
      this.cards.deck = shuffle(this.cards.discard);
      this.cards.discard = [];
    }

    player.cards[pile].push(this.cards.deck.shift());

    if (done) {
      // Set the player status
      this.playerStatus = {
        player,
        type: 'buy-card',
        done: cards => {
          // Player status is resolved
          this.playerStatus = null;

          // Show UI components
          player.ui = {
            drawer: 'hand'
          };

          LogService.pushLog(
            this.id,
            new Log(player.number, [
              ` bought ${cards.length} cards `,
              { param: 'card back' },
              '.'
            ])
          );

          done && done();
        }
      };
    }
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
   * Draw and reveal cards until they match a particular filter
   *
   * @param {*} player Player who's drawing cards
   * @param {*} revealFilter Filter for what to draw for
   * @param {*} num How many cards needed to be found
   * @param {*} label Label to be shown (for play log)
   * @param {*} icon Icon to be shown (for play log)
   */
  revealCards(player, revealFilter, num, label, icon) {
    const reveal = [];
    let keep = [];

    // Draw cards until the number of matching cards reaches the expected size
    while (
      (keep = reveal
        .map(card => this.cardStore.project[card.card])
        .filter(revealFilter || (() => true))
        .map(card => ({
          card: normalize(card.number)
        }))).length < num
    ) {
      reveal.push(this.cards.deck.shift());
    }

    // Select the cards that will move to the hand
    if (revealFilter) {
      reveal.forEach(card => {
        if (keep.map(({ card }) => card).includes(card.card)) {
          card.select = true;
        }
      });
    }

    // Add the cards we were looking for to hand, and discard the rest
    // TODO: Move this logic to the cards which use it
    // player.cards.hand = player.cards.hand.concat(keep);
    // this.cards.discard = this.cards.discard.concat(
    //   reveal.filter(({ card }) => !keep.map(({ card }) => card).includes(card))
    // );

    // Add a log for users to see revealed cards
    LogService.pushLog(
      this.id,
      new Log(player.number, [
        ` searched for ${num} `,
        icon,
        ` ${label} and has `,
        { reveal },
        '.'
      ])
    );

    return reveal.map(card => this.cardStore.project[card.card]);
  }

  /**
   * Bump up the param and give the player the rewards
   *
   * @param {Player} player Player who receives the rewards for the bump
   * @param {string} param Param to bump
   * @param {func} done Callback once param is complete
   */
  param(player, param, done) {
    if (
      paramStats[param] !== undefined &&
      (this.params[param] < paramStats[param].max ||
        (paramStats[param].step < 0 &&
          this.params[param] > paramStats[param].max))
    ) {
      this.params[param] += paramStats[param].step || 1;
      this.tr(player, 1);

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
        rewardAction(player, this, done);
        rewardAction.length < 3 && done();
      } else {
        done && done();
      }
    }
  }

  /**
   * Prompt for playing a card
   *
   * @param {object} player The player to prompt
   * @param {func} callback Callback once the card is played
   */
  promptCard(player, callback) {
    player.ui = {
      drawer: 'hand'
    };

    this.playerStatus = {
      type: 'prompt-card',
      player,
      modifiers: {},
      done: () => {
        // Player status is resolved
        this.playerStatus = null;

        // Show UI components
        player.ui = {
          drawer: this.phase === 'prelude' ? 'prelude' : 'hand'
        };

        callback && callback();
      }
    };
  }

  /**
   * Prompt for a tile placement
   *
   * @param {object} player Player placing the tile
   * @param {string} tile Tile type to place (ocean, city, greenery, or {special: 'type'})
   * @param {func} callback Callback once the tile is placed
   */
  promptTile(player, tile, callback, customFilter) {
    // If all the oceans are placed, don't prompt
    if (tile === 'ocean' && this.params.ocean <= 0) {
      callback && callback();
      return;
    }

    const possibleTiles = this.findPossibleTiles(tile, player, customFilter);
    if (possibleTiles.length) {
      possibleTiles.forEach(
        t => (t.clickable = isString(tile) ? tile : 'special')
      );

      // Hide UI components to allow easier access to board
      player.ui = {
        drawer: null,
        playerStats: {
          show: false,
          pid: player.number
        },
        currentCard: { show: false },
        showMilestones: false,
        showStandardProjects: false
      };

      // Set the player status
      this.playerStatus = {
        player,
        tile,
        type: 'prompt-tile',
        done: placedTile => {
          // Raise params if necessary
          if (tile === 'ocean') {
            this.param(player, 'ocean');
          } else if (tile === 'greenery') {
            this.param(player, 'oxygen');
          }

          // Remove clickable
          possibleTiles.forEach(t => (t.clickable = null));

          // Player status is resolved
          this.playerStatus = null;

          // Show UI components
          player.ui = {
            drawer: this.phase === 'prelude' ? 'prelude' : 'hand',
            playerStats: {
              show: true,
              pid: player.number
            }
          };

          callback && callback(placedTile);
        }
      };
    }
  }

  /**
   * Prompt for a player
   *
   * @param {object} player The player to prompt
   * @param {object} icon The icon to prompt for
   * @param {array} logSnippet The snippet of a log that would fit this sentence: '{player} {snippet} {targetPlayer}'
   * @param {func} callback Callback once the player is picked
   * @param {func} filter Optional player filter
   */
  promptPlayer(player, icon, logSnippet, callback, filter = () => true) {
    player.ui = {
      currentCard: { show: false }
    };

    this.playerStatus = {
      type: 'prompt-player',
      icon,
      player,
      logSnippet,
      validPlayers: this.players.filter(filter).map(p => p.number),
      done: pickedPlayer => {
        // Player status is resolved
        this.playerStatus = null;

        // Show UI components
        player.ui = {
          drawer: this.phase === 'prelude' ? 'prelude' : 'hand',
          playerStats: {
            show: true,
            pid: player.number
          }
        };

        callback && callback(pickedPlayer);
      }
    };
  }

  /**
   * Place a tile on the board
   *
   * @param {object} player Player placing the tile
   * @param {object} area Field area to place the tile
   * @param {string} tile Tile to place, e.g. 'ocean', 'city', etc.
   * @param {func} done Callback once the tile is placed
   */
  placeTile(player, area, tile, done) {
    const type = isString(tile) ? tile : 'special';

    // Set the tile
    area.name = `${type.replace(/ /, '-')}-placed`;
    area.type = type;

    // If it's a special tile, set the icon
    if (tile.special) {
      area.icon = tile.special;
    }

    // Add a player marker
    if (type !== 'ocean') {
      area.player = player.number;
    }

    // Log the placement
    LogService.pushLog(
      this.id,
      new Log(player.number, [
        ` placed ${
          type === 'ocean' ? 'an' : !isString(tile) ? 'the' : 'a'
        } ${type} `,
        { tile: type },
        ' tile.'
      ])
    );

    // Ocean adjacencies
    if (area.id) {
      player.resources.megacredit +=
        this.neighbors(area).filter(t => t.type === 'ocean').length *
        player.rates.ocean;
    }

    // TODO: Trigger placement events

    let notDone = true;
    // Handle placement bonuses
    (area.resources || [])
      .filter(r => r)
      .forEach(r => {
        // Resources on the space
        if (r === 'card') {
          this.drawCard(player);
        } else if (r === 'ocean') {
          notDone = false;
          this.promptTile(player, 'ocean', done);
        } else if (r.megacredit) {
          player.resources.megacredit += r.megacredit;
        } else {
          player.resources[r]++;
        }
      });

    notDone && done(area);
  }

  /**
   * Switch to prelude phase, i.e. reveal preludes
   */
  beginPreludePhase() {
    LogService.pushLog(
      this.id,
      new Log(0, [{ prelude: 'PRELUDE PHASE', drawer: 'prelude' }], true, {
        classNames: ['phase', 'prelude-phase']
      })
    );

    this.phase = 'prelude';
    this.turn = this.startingPlayer;
    this.players.forEach(player => (player.ui.drawer = 'prelude'));
  }

  /**
   * Switch to the player order phase
   */
  beginPlayerOrderPhase() {
    this.startingPlayer++;
    if (this.startingPlayer > this.players.length) {
      this.startingPlayer = 1;
    }
    const gen = ++this.params.generation;
    this.turn = this.startingPlayer;

    LogService.pushLog(
      this.id,
      new Log(
        0,
        [
          gen,
          {
            super:
              ['th', 'st', 'nd', 'rd'][
                gen < 10 ? gen : gen > 20 ? gen % 10 : 0
              ] || 'th'
          },
          ' generation'
        ],
        true,
        { classNames: ['phase'] }
      )
    );

    LogService.pushLog(
      this.id,
      new Log(this.startingPlayer, ' will be your starting player!')
    );

    this.beginResearchPhase();
  }

  /**
   * Switch to the research phase
   */
  beginResearchPhase() {
    LogService.pushLog(
      this.id,
      new Log(0, [{ project: 'RESEARCH PHASE', drawer: 'hand' }], true, {
        classNames: ['phase', 'research-phase']
      })
    );

    this.phase = 'research';
    this.players.forEach(player => (player.ui.drawer = 'hand'));
  }

  /**
   * Switch to action phase
   */
  beginActionPhase() {
    LogService.pushLog(
      this.id,
      new Log(0, [{ project: 'ACTION PHASE', drawer: 'hand' }], true, {
        classNames: ['phase', 'action-phase']
      })
    );

    this.phase = 'action';
    this.turn = this.startingPlayer;
    this.players[this.turn].firstAction = true;
    this.players.forEach(player => (player.ui.drawer = 'hand'));
  }

  /**
   * Switch to the production phase
   */
  beginProductionPhase() {
    LogService.pushLog(
      this.id,
      new Log(0, ['PRODUCTION PHASE'], true, {
        classNames: ['phase', 'production-phase']
      })
    );

    this.players.forEach(player => {
      // Reset players
      player.firstAction = true;
      player.passed = false;

      // Move existing power to heat
      player.resources.heat += player.resources.power;
      player.resources.power = 0;

      // Megacredits
      player.resources.megacredit += player.tr + player.production.megacredit;

      // Everything else
      player.resources.steel += player.production.steel;
      player.resources.titanium += player.production.titanium;
      player.resources.plant += player.production.plant;
      player.resources.power += player.production.power;
      player.resources.heat += player.production.heat;

      // TODO: Remove played status from Active cards
      player.cards.active.forEach(c => (c.disabled = false));
      player.cards.corp.forEach(c => (c.disabled = false));
    });

    // TODO: shift to Solar Phase if using Venus and using WGT
    this.beginPlayerOrderPhase();
  }

  /**
   * Switch to the solar phase
   */
  beginSolarPhase() {
    // TODO: implement this

    this.phase = 'action';
    this.turn = this.startingPlayer;

    this.beginPlayerOrderPhase();
  }

  /**
   * Advance to the next turn
   */
  nextTurn() {
    // If all players have passed, move into the production phase
    if (this.players.every(p => p.passed)) {
      this.beginProductionPhase();
      return;
    }

    const player = this.players[this.turn - 1];

    // First action, don't move to next turn
    if (this.phase === 'action' && player.firstAction) {
      player.firstAction = false;
      return;
    }

    do {
      this.turn++;
      if (this.turn > this.players.length) {
        this.turn = 1;
      }
    } while (this.players[this.turn - 1].passed);

    this.players[this.turn - 1].firstAction = true;
  }

  /**
   * Fires an event
   *
   * @param {string} evt Event
   * @param {Player} player Player which fired the event
   */
  fire(evt, player) {
    // TODO: Loop through Action cards and corps
    console.log(evt, player.number);
  }

  /**
   * Helper method to increase/decrease a resource
   *
   * @param {Player} player Player doing the action
   * @param {string} resource Resource to change
   * @param {number} num Amount to change
   */
  resources(player, resource, num) {
    player.resources[resource] += num;
    if (player.resources[resource] < 0) {
      player.resources[resource] = 0;
    }
    // TODO fire resource change
  }

  /**
   * Helper method to increase/decrease a resource production
   *
   * @param {Player} player Player doing the action
   * @param {string} resource Resource production to change
   * @param {number} num Amount to change
   */
  production(player, resource, num) {
    player.production[resource] += num;
    // TODO fire production change
  }

  /**
   * Helper method to increase/decrease the player's terraform rating
   *
   * @param {Player} player Player doing the action
   * @param {number} num Amount to change
   */
  tr(player, num) {
    player.tr += num;
    // TODO fire terraform change
  }

  /**
   * Helper method to increase/decrease the card's resource
   *
   * @param {Player} player Player doing the action
   * @param {Card} card Card to change
   * @param {number} value Amount to change
   */
  cardResource(player, card, value = 0) {
    const playerCard = player.cards.hand
      .concat(player.cards.active)
      .concat(player.cards.corp)
      .find(c => c.card === card.number);

    if (!playerCard.resource) {
      playerCard.resource = 0;
    }

    playerCard.resource += value;

    return playerCard.resource;
  }

  pushLog(player, log) {
    LogService.pushLog(this.id, new Log(player.number, log));
  }

  getField() {
    return this.field;
  }

  /**
   * Converts the game model to be sent to the client
   */
  export() {
    // eslint-disable-next-line no-unused-vars
    const { cards, cardStore, log, ...strippedGame } = this;
    return strippedGame;
  }
}

export default Game;
