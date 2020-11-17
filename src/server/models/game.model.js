import { shuffle, isString, uniq } from 'lodash';
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
  playerStatus;

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
            +corp.number !== 0 &&
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
    // TODO: FOR TESTING, REMOVE
    // this.startingPlayer = 1;
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
    if (this.sets.includes('prelude')) {
      for (let i = 0; i < 4; i++) {
        this.forEachPlayerOrder(player =>
          player.cards.prelude.push(this.cards.preludes.shift())
        );
      }
    }

    // Solo game, starts at TR 14
    if (this.players.length === 1) {
      this.players[0].tr = 14;
    } else {
      this.players.forEach(player => (player.tr = 20));
    }

    // TODO: FOR TESTING, REMOVE
    this.players[0].cards.prelude = ['P12', 'P09'].map(card => ({ card }));
    this.players[1].cards.prelude = ['P14', 'P10'].map(card => ({ card }));
    this.players[2].cards.prelude = ['P17', 'P18'].map(card => ({ card }));
    this.players[3].cards.prelude = ['P19', 'P20'].map(card => ({ card }));
    this.players[4].cards.prelude = ['P21', 'P22'].map(card => ({ card }));
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
   * Draw and reveal cards until they match a particular filter
   *
   * @param {*} player Player who's drawing cards
   * @param {*} revealFilter Filter for what to draw for
   * @param {*} size How many cards needed to be found
   * @param {*} label Label to be shown (for play log)
   * @param {*} icon Icon to be shown (for play log)
   */
  revealCards(player, revealFilter, size, label, icon) {
    const reveal = [];
    let keep = [];

    // Draw cards until the number of matching cards reaches the expected size
    while (
      (keep = reveal
        .map(card => this.cardStore.project[card.card])
        .filter(revealFilter)
        .map(card => ({
          card: normalize(card.number)
        }))).length < size
    ) {
      reveal.push(this.cards.deck.shift());
    }

    // Select the cards that will move to the hand
    reveal.forEach(card => {
      if (keep.map(({ card }) => card).includes(card.card)) {
        card.select = true;
      }
    });

    // Add the cards we were looking for to hand, and discard the rest
    player.cards.hand = player.cards.hand.concat(keep);
    this.cards.discard = this.cards.discard.concat(
      reveal.filter(({ card }) => !keep.map(({ card }) => card).includes(card))
    );

    // Add a log for users to see revealed cards
    LogService.pushLog(
      this.id,
      new Log(player.number, [
        ` searched for ${size} `,
        icon,
        ` ${label} and has `,
        { reveal },
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
      player,
      modifiers: {},
      done: () => {
        // Player status is resolved
        this.playerStatus = null;

        // Show UI components
        player.ui = {
          drawer: 'prelude'
        };

        callback && callback();
      }
    };
  }

  /**
   * Prompt for a tile placement
   *
   * @param {string} tile Tile type to place (ocean, city, greenery, or {special: 'type'})
   * @param {object} player Player placing the tile
   * @param {func} callback Callback once the tile is placed
   */
  promptTile(tile, player, callback) {
    const possibleTiles = this.findPossibleTiles(tile, player);
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
        activeCard: { show: false },
        showMilestones: false,
        showStandardProjects: false
      };

      // Set the player status
      this.playerStatus = {
        player,
        tile,
        done: () => {
          // Raise params if necessary
          if (tile === 'ocean') {
            this.param('ocean', player);
          } else if (tile === 'greenery') {
            this.param('oxygen', player);
          }

          // Remove clickable
          possibleTiles.forEach(t => (t.clickable = null));

          // Player status is resolved
          this.playerStatus = null;

          // Show UI components
          player.ui = {
            drawer: 'prelude',
            playerStats: {
              show: true,
              pid: player.number
            }
          };

          callback && callback();
        }
      };
    }
  }

  /**
   * Get a tile from a tile id
   *
   * @param {number} id
   */
  tileFromId(id) {
    const coords = this.idToCoords(id);
    return this.field[coords.y][coords.x];
  }

  /**
   * Get the array coordinates of the id
   * @param {number} id
   */
  idToCoords(id) {
    let x = +id;
    let y = 0;

    for (let s = 5, d = 1; x >= s; x -= s, s += d, y++) {
      if (s >= 9) {
        d = -1;
      }
    }
    return { x, y };
  }

  /**
   * Find the possible locations for a tile type
   *
   * @param {string} tile Tile type (ocean, city, greenery, {special: 'type'})
   * @param {object} player The player finding possible tiles
   */
  findPossibleTiles(tile, player) {
    const self = this;

    if (tile === 'ocean') {
      return this.field.flat().filter(
        t =>
          // Reserved ocean spots
          t.attrs?.includes('reserved-ocean') &&
          // Not occupied
          !t.name
      );
    } else if (tile === 'city') {
      return this.field.flat().filter(
        t =>
          // Not reserved
          !t.attrs?.filter(attr => attr.includes('reserved')).length &&
          // Not occupied
          !t.name &&
          // Not adjacent to another city
          !self.neighbors(t).filter(neighbor => neighbor.type === 'city').length
      );
    } else if (tile === 'greenery') {
      // Spaces adjacent to player's tiles
      const adjacentSites = uniq(
        this.field
          .flat()
          // Get board tiles owned by player
          .filter(t => t.player === player.number)
          // Get neighbors
          .map(t => this.neighbors(t))
          .flat()
      );

      return (adjacentSites.length ? adjacentSites : this.field.flat()).filter(
        t =>
          // Not reserved
          !t.attrs?.filter(attr => attr.includes('reserved')).length &&
          // Not occupied
          !t.name
      );
    } else if (!isString(tile)) {
      // TODO special tiles
      return [];
    }
  }

  /**
   * Return adjacent tiles
   *
   * @param {Tile} tile Tile to get neighbors of
   */
  neighbors(tile) {
    const neighbors = [];
    const { x, y } = { ...this.idToCoords(tile.id) };

    // Grab top neighbors
    if (y > 0) {
      // Upper rows
      if (this.field[y].length > this.field[y - 1].length) {
        // Top left
        if (x > 0) {
          neighbors.push(this.field[y - 1][x - 1]);
        }
        // Top right
        if (x < this.field[y].length - 1) {
          neighbors.push(this.field[y - 1][x]);
        }
      }

      // Lower rows
      if (this.field[y].length < this.field[y - 1].length) {
        // Top left
        neighbors.push(this.field[y - 1][x]);
        // Top right
        neighbors.push(this.field[y - 1][x + 1]);
      }
    }

    // Left
    if (x > 0) {
      neighbors.push(this.field[y][x - 1]);
    }
    // Right
    if (x < this.field[y].length - 1) {
      neighbors.push(this.field[y][x + 1]);
    }

    // Grab bottom neighbors
    if (y < this.field.length - 1) {
      // Upper rows
      if (this.field[y].length < this.field[y + 1].length) {
        // Bottom left
        neighbors.push(this.field[y + 1][x]);
        // Bottom right
        neighbors.push(this.field[y + 1][x + 1]);
      }

      // Lower rows
      if (this.field[y].length > this.field[y + 1].length) {
        // Bottom left
        if (x > 0) {
          neighbors.push(this.field[y + 1][x - 1]);
        }
        // Bottom right
        if (x < this.field[y].length - 1) {
          neighbors.push(this.field[y + 1][x]);
        }
      }
    }

    return neighbors;
  }

  /**
   * Switch to prelude phase, i.e. reveal preludes
   */
  beginPreludePhase() {
    LogService.pushLog(
      this.id,
      new Log(0, [{ prelude: 'PRELUDE PHASE', drawer: 'prelude' }], true, {
        classNames: ['phase', 'prelude']
      })
    );

    this.phase = 'prelude';
    this.turn = this.startingPlayer;
    this.players.forEach(player => (player.ui.drawer = 'prelude'));
  }

  /**
   * Switch to action phase
   */
  beginActionPhase() {
    LogService.pushLog(
      this.id,
      new Log(0, [{ prelude: 'ACTION PHASE', drawer: 'hand' }], true, {
        classNames: ['phase', 'action']
      })
    );

    this.phase = 'action';
    this.turn = this.startingPlayer;
    this.players.forEach(player => (player.ui.drawer = 'hand'));
  }

  /**
   * Perform an action in player order
   *
   * @param {Function} func Action to perform in player order
   */
  forEachPlayerOrder(func) {
    for (
      let i = this.startingPlayer - 1, start = true;
      start || i !== this.startingPlayer - 1;
      i = i >= this.players.length - 1 ? 0 : i + 1, start = false
    ) {
      func(this.players[i], i);
    }
  }

  /**
   * Advance to the next turn
   */
  nextTurn() {
    // TODO: handle passes and skips
    this.turn++;
    if (this.turn > this.players.length) {
      this.turn = 1;
    }
  }

  resources(player, resource, num) {
    player.resources[resource] += num;
    // TODO fire resource change
  }

  production(player, resource, num) {
    player.production[resource] += num;
    // TODO fire production change
  }

  tr(player, num) {
    player.tr += num;
    // TODO fire terraform change
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
