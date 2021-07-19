import Service, { sse, push } from './Service';
import CardStore from '../models/card.model';
import LogService from './log.service';
import Log from '../models/log.model';
import Game from '../models/game.model';
import shortid from 'shortid';
import redis from 'redis';
import { promisify } from 'util';
import Tharsis from '../../shared/boards/Tharsis';
import Elysium from '../../shared/boards/Elysium';
import Hellas from '../../shared/boards/Hellas';
import Player from '../models/player.model';
import { last } from 'lodash';

const client = redis.createClient();
const redisGet = promisify(client.get).bind(client);

/**
 * Push filter to prevent other player's cards to be shared with other players
 *
 * @param {*} game The game
 * @param {*} listener Client
 */
const gameFilter = (game, listener) => ({
  ...game,
  players: game.players.map((player, i) => ({
    ...player,
    cards:
      i === listener.req.query.player - 1
        ? player.cards
        : {
            active: player.cards.active,
            automated: player.cards.automated,
            event: player.cards.event,
            corp: player.cards.corp
          }
  }))
});

/**
 * Game service, handles all actions related to playing a TMars game
 */
@sse
class GameService {
  cardStore = new CardStore();
  games = {};

  /**
   * Registers a created game
   *
   * @param {Game} game Game to register
   * @param {string} id Game ID, or blank to generate a new one
   * @returns Game ID
   */
  registerGame(game, id = shortid.generate()) {
    this.games[id] = game;
    game.id = id;

    // eslint-disable-next-line no-unused-vars
    const { cardStore, ...gameNoStore } = game;

    client.set(id, JSON.stringify(gameNoStore), () => {});

    return id;
  }

  /**
   * Gets the current state of the game
   *
   * @param {string} id Game ID
   */
  async getGame(id) {
    if (!this.games[id]) {
      this.games[id] = new Game(this.cardStore, JSON.parse(await redisGet(id)));
    }

    return this.games[id];
  }

  /**
   * Gets the list of games
   */
  getGames(done) {
    return client.keys('*', (err, keys) => {
      client.mget(...keys, (err, games) => {
        done(
          (games || [])
            .map(game => JSON.parse(game))
            .map(game => ({
              id: game.id,
              sets: game.sets,
              players: game.players.map(player => ({
                name: player.name,
                number: player.number,
                tr: player.tr,
                corp: this.cardStore.get(player.cards.corp[0].card)?.title
              })),
              turn: game.turn,
              params: game.params,
              variants: game.variants,
              board: game.board,
              phase: game.phase,
              endGame: game.endGame
            }))
        );
      });
    });
  }

  /**
   * Gets the current state of the game and converts to a format that can be exported to the UI
   *
   * @param {*} id Game ID
   * @param {*} player Player number
   */
  async getAndExportGame(id, player) {
    const game = await this.getGame(id);
    return gameFilter(this.export(game), {
      req: { query: { player } }
    });
  }

  /**
   * Creates a new game
   *
   * @param {string} id Game ID
   * @param {object} opts Game options
   */
  createGame(id, game) {
    console.log('Creating game', id);
    const newGame = new Game(this.cardStore, game);
    newGame.players = game.players.map(name => new Player({ name }));
    newGame.init();
    this.registerGame(newGame, id);
  }

  /**
   * Delete a game
   *
   * @param {string} id Game ID
   * @param {object} res Response object
   */
  deleteGame(id, res) {
    console.log('Deleting game', id);
    if (this.games[id]) {
      delete this.games[id];
      client.del(id);
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  }

  /**
   * Play a card
   *
   * @param {string} id Game
   * @param {number} playerNum Player number
   * @param {object} card Card to be played
   * @returns Game status
   */
  @push(gameFilter)
  playCard(id, playerNum, params) {
    const game = this.games[id];
    const player = this.getPlayer(game, playerNum);

    const card = player.cards.hand.find(c => c.card === params.card.card);
    // Card wasn't in hand, don't perform any further actions
    if (!card) {
      return this.export(game);
    }

    const playedCard = this.cardStore.get(card.card);

    console.log(
      `${id}:`,
      player.name,
      'played',
      playedCard.title,
      `(${playedCard.number})`
    );

    // TODO: Check requirements
    // TODO: Check if player can afford card
    // TODO: Check if player can afford resources used

    // Pay for the card
    let cost = playedCard.cost;

    if (params.steel && playedCard.tags.includes('building')) {
      cost -= params.steel * player.rates.steel;
    }
    if (params.titanium && playedCard.tags.includes('space')) {
      cost -= params.titanium * player.rates.titanium;
    }
    if (params.heat) {
      cost -= params.heat;
    }
    // Verify the player can afford the card
    if (cost <= player.resources.megacredit) {
      player.resources.steel -= params.steel;
      player.resources.titanium -= params.titanium;
      player.resources.heat -= params.heat;
      player.resources.megacredit -= cost;
    } else {
      // return this.export(game);
    }

    LogService.pushLog(
      id,
      new Log(playerNum, [' played ', { project: card.card }, '.'])
    );

    // Set tags if card is not event
    if (playedCard.type === 'event') {
      player.tags.event++;
    } else {
      playedCard.tags.forEach(
        tag => (player.tags[tag] = (player.tags[tag] ?? 0) + 1)
      );
    }

    // Put card in appropriate drawer
    player.cards[playedCard.type].push(card);

    // Remove from hand
    player.cards.hand = player.cards.hand.filter(c => c?.card !== card.card);

    // Hide current card
    player.ui.currentCard.show = false;

    // Capture the stack index before performing the action
    const stackIndex = player.actionStack.length - 1;

    // Perform card's action
    game.performAction(playedCard, player, playedCard);

    // Trigger card-played events
    game.fire('onCardPlayed', player, playedCard);
    game.fire('onAnyCardPlayed', player, playedCard);

    // The action is complete!
    game.completeAction(player, stackIndex, playedCard);

    return this.export(game);
  }

  /**
   * Play a prelude
   *
   * @param {string} id Game
   * @param {number} playerNum Player number
   * @param {object} card Prelude to be played
   * @returns Game status
   */
  @push(gameFilter)
  playPrelude(id, playerNum, card) {
    const game = this.games[id];
    const player = this.getPlayer(game, playerNum);
    const playedCard = this.cardStore.get(card.card);

    // Check to make sure the user can play this prelude
    if (
      !player.cards.prelude.some(c => card.card === c.card) ||
      player.cards.prelude.find(c => card.card === c.card).disabled
    ) {
      return this.export(game);
    }

    console.log(
      `${id}:`,
      player.name,
      'revealed prelude',
      playedCard.title,
      `(${playedCard.number})`
    );

    LogService.pushLog(
      id,
      new Log(playerNum, [' revealed ', { prelude: card.card }, '.'])
    );

    // Set tags
    playedCard.tags.forEach(
      tag => (player.tags[tag] = (player.tags[tag] ?? 0) + 1)
    );

    // Hide card
    player.ui.currentCard.show = false;

    // Capture the stack index before performing the action
    const stackIndex = player.actionStack.length - 1;

    // Perform prelude's action
    game.performAction(playedCard, player, playedCard);

    // Mark prelude as played
    player.cards.prelude.find(
      prelude => prelude.card === card.card
    ).disabled = true;

    // The action is complete!
    game.completeAction(player, stackIndex, playedCard);

    return this.export(game);
  }

  /**
   * Performs a card action
   *
   * @param {string} id Game ID
   * @param {number} playerNum Player number
   * @param {object} card Card whose action we are peforming
   * @param {number} index Action index to be used
   * @param {number} count If a counter was used, the count value
   */
  @push(gameFilter)
  cardAction(id, playerNum, card, index, count) {
    const game = this.games[id];
    const player = this.getPlayer(game, playerNum);
    const playedCard = this.cardStore.get(card.card.card);
    const action = (last(player.actionStack)?.ui?.currentCard?.actions ||
      playedCard.actions)[index];

    // Capture the stack index before performing the action
    const stackIndex = player.actionStack.length - 1;

    // Hide active card
    player.ui.currentCard.show = false;

    if (action) {
      const targetPlayer = action.targetPlayer
        ? this.getPlayer(game, action.targetPlayer)
        : player;

      console.log(
        `${id}:`,
        player.name,
        'performed action',
        index + 1,
        'for',
        playedCard.title,
        `(${playedCard.number})`
      );

      // Show in chat log
      let log = [
        ' used an action on ',
        { [playedCard.type === 'corp' ? 'corp' : 'project']: card.card.card }
      ];
      if (action.log) {
        log.push(' to ');
        log = log.concat(action.log);
      }
      LogService.pushLog(id, new Log(playerNum, log.concat(['.'])));

      // Perform card's action
      game.performAction(action, targetPlayer, playedCard, { count });
    }

    // The action is complete!
    game.completeAction(
      player,
      stackIndex,
      () =>
        // Mark active card or corp as played by marking as "disabled"
        (player.cards[card.type === 'project' ? 'active' : 'corp'].find(
          c => c.card === card.card.card
        ).disabled = true)
    );

    return this.export(game);
  }

  /**
   * Toggles selection of a card
   *
   * @param {string} id Game ID
   * @param {number} playerNum Player number
   * @param {object} card Card to toggle
   * @param {string} type Card type. One of [project, corp, prelude]
   * @param {boolean} single Deselects all other cards if true
   * @returns Game status
   */
  @push(gameFilter)
  toggleSelectCard(id, playerNum, card, type, single) {
    const game = this.games[id];
    const player = this.getPlayer(game, playerNum);

    console.log(
      `${id}:`,
      player.name,
      card.select ? 'deselected' : 'selected',
      card.card
    );

    const select = c =>
      card.card === c.card
        ? { ...c, select: single ? true : !card.select }
        : { ...c, select: single ? false : c.select };

    if (type === 'chooser' && player.actionStack.length) {
      const lastAction = last(player.actionStack);
      Object.keys(lastAction.cards).forEach(
        k => (lastAction.cards[k] = lastAction.cards[k].map(select))
      );
    } else {
      player.cards[type] = player.cards[type].map(select);
    }

    return this.export(game);
  }

  /**
   * Buys all cards selected and discards unselected
   *
   * @param {string} id Game ID
   * @param {number} playerNum Player number
   * @returns Game status
   */
  @push(gameFilter)
  buySelectedCards(id, playerNum) {
    const game = this.games[id];
    const player = this.getPlayer(game, playerNum);
    const cost = player.cards.buy.filter(card => card.select).length * 3;

    if (player.resources.mc < cost) {
      // TODO: Handle error
    }

    // Pay for the cards
    if (game.phase !== 'start') {
      player.resources.megacredit -= cost;
    }

    // The cards that were bought
    const boughtCards = player.cards.buy
      .filter(card => card.select)
      .map(card => ({ card: card.card }));
    // The cards that were discarded
    const discardedCards = player.cards.buy
      .filter(card => !card.select)
      .map(card => ({ card: card.card }));

    console.log(
      `${id}:`,
      player.name,
      'bought',
      boughtCards.length,
      'discarded',
      discardedCards.length
    );

    // Move bought cards into hand
    player.cards.hand = player.cards.hand.concat(boughtCards);

    // Move unbought cards into discard pile
    game.cards.discard = game.cards.discard.concat(discardedCards);

    // Clear out buy cards
    player.cards.buy = [];

    LogService.pushLog(
      id,
      new Log(player.number, [
        ` bought ${boughtCards.length} cards `,
        { param: 'card back' },
        '.'
      ])
    );

    // If start phase, check if everyone's done their starting activities
    if (game.phase === 'start') {
      this.checkStartPhaseDone(game);
    }

    // If research phase and everyone's bought their researched/drafted cards, move to action phase
    if (
      game.phase === 'research' &&
      !game.players.some(player => player.cards.buy.length > 0)
    ) {
      game.beginActionPhase();
    }

    // The action is complete!
    game.completeAction(player, player.actionStack.length - 1, {
      boughtCards,
      discardedCards
    });

    return this.export(game);
  }

  /**
   * Draft a card and send the rest to the next player
   *
   * @param {string} id Game ID
   * @param {number} playerNum Player number
   * @param {object} card Card to draft
   * @returns Game status
   */
  @push(gameFilter)
  draftCard(id, playerNum) {
    const game = this.games[id];
    const player = this.getPlayer(game, playerNum);
    const card = player.cards.draft.filter(c => c.select)[0];
    card.select = false;

    if (!card) {
      return this.export(game);
    }

    console.log(`${id}:`, player.name, 'drafted', card.card);

    // Move card to buy pile
    player.cards.buy.push(card);

    // Send draft cards to next player
    this.getDraftTargetPlayer(player, game).cards.onDeck.push(
      player.cards.draft.filter(c => c.card !== card.card)
    );

    // Empty draft deck (since it was passed)
    player.cards.draft = [];

    // Grab the next set on deck for each player
    game.players
      .filter(p => !p.cards.draft.length)
      .forEach(p => {
        p.cards.draft = p.cards.onDeck.length ? p.cards.onDeck.shift() : [];

        // 4 cards drafted, switch back to hand
        if (p.cards.buy.length === 4) {
          p.ui.drawer = 'hand';
        }
      });

    return this.export(game);
  }

  /**
   * Confirm the selection of a set of cards
   *
   * @param {string} id Game ID
   * @param {number} playerNum Player number
   * @param {string} type Card type
   */
  @push(gameFilter)
  confirmSelection(id, playerNum, type) {
    const game = this.games[id];
    const player = this.getPlayer(game, playerNum);
    const stackAction = last(player.actionStack);

    const selectedCards = (
      player.cards[type] ||
      (type === 'chooser' && Object.values(stackAction.cards).flat()) ||
      []
    )
      .filter(card => card.select)
      .map(card => ({ ...card, select: false }));

    if (!stackAction) {
      player.cards[type] = selectedCards;

      // Beginner corp, move all BUY cards to hand
      if (type === 'corp' && player.cards.corp[0].card === '000') {
        player.cards.hand = player.cards.buy.map(card => ({
          card: card.card
        }));
        player.cards.buy = [];
      }

      if (game.phase === 'start') {
        this.checkStartPhaseDone(game);
      }
    } else if (stackAction.type === 'prompt-card') {
      // Capture the stack index before performing the action
      const stackIndex = player.actionStack.length - 1;

      // The action is complete!
      game.completeAction(player, stackIndex, selectedCards);
    }

    return this.export(game);
  }

  /**
   * Place a tile
   *
   * @param {string} id Game ID
   * @param {number} tileId Tile id
   */
  @push(gameFilter)
  placeTile(id, tileId, playerNum) {
    const game = this.games[id];
    const player = game.players[playerNum - 1];
    const area = game.tileFromId(tileId);
    const action = last(player.actionStack);

    console.log(
      `${id}:`,
      player.name,
      `placed a${action.tile === 'ocean' ? 'n' : ''}`,
      action.tile,
      'tile at',
      area.id
    );

    game.placeTile(
      player,
      area,
      action.tile === 'special' ? { special: action.icon } : action.tile
    );

    return this.export(game);
  }

  /**
   * Show/toggle the player stats pane
   *
   * @param {string} id Game ID
   * @param {number} playerNum Player number
   * @param {object} ui The new state of the UI
   */
  updateUI(id, playerNum, ui) {
    const game = this.games[id];
    const player = this.getPlayer(game, playerNum);
    player.ui = { ...player.ui, ...ui };
    return this.export(game);
  }

  /**
   * Pass or skip a turn
   *
   * @param {string} id Game ID
   */
  @push(gameFilter)
  passSkip(id) {
    const game = this.games[id];
    const player = this.getPlayer(game, game.turn);

    if (player.firstAction) {
      console.log(`${id}:`, player.name, 'passed');

      player.passed = true;
      player.firstAction = false;

      // Log the pass
      LogService.pushLog(game.id, new Log(player.number, [' passed.']));
    } else {
      console.log(`${id}:`, player.name, 'skipped');

      // Log the skip
      LogService.pushLog(game.id, new Log(player.number, [' skipped.']));
    }

    game.nextTurn();

    return this.export(game);
  }

  /**
   * Play a standard project
   *
   * @param {string} id Game ID
   * @param {number} playerNum Player ID
   * @param {string} project Standard project to be played
   * @param {string} resource Resource used (i.e. plant/heat)
   * @param {object} res Response handler
   */
  @push(gameFilter)
  standardProject(id, playerNum, project, resource, res) {
    const game = this.games[id];
    const player = this.getPlayer(game, playerNum);

    console.log(`${id}:`, player.name, 'played standard project', project);

    const doProject = (
      cost,
      action,
      canPlay = player.resources.megacredit >= cost ||
        (resource && player.resources[resource] >= player.rates[resource])
    ) => {
      if (canPlay) {
        LogService.pushLog(
          game.id,
          new Log(player.number, [
            ' used the ',
            { standardProject: project },
            ' standard project',
            resource
              ? ` by converting ${
                  resource === 'heat' ? 'heat' : `${resource}s`
                } `
              : '',
            resource ? { resource } : '',
            '.'
          ])
        );

        if (resource) {
          game.resources(player, resource, -player.rates[resource]);
        } else {
          game.resources(player, 'megacredit', -cost);

          // Only fire when M€ was used as using plant/heat doesn't actually count as a standard project
          game.fire('onStandardProject', player, { project, cost });
        }
        game.performAction(action, player);
      } else {
        res.sendStatus(403);
      }
    };

    if (game.turn === playerNum) {
      switch (project) {
        case 'Sell Patents': {
          doProject(0, done => done(), player.cards.hand.length);
          break;
        }
        case 'Power Plant': {
          doProject(player.rates.powerplant || 11, {
            production: { power: 1 }
          });
          break;
        }
        case 'Asteroid': {
          doProject(14, { param: ['temperature'] });
          break;
        }
        case 'Aquifer': {
          doProject(18, { tile: 'ocean' });
          break;
        }
        case 'Greenery': {
          doProject(23, { tile: 'greenery' });
          break;
        }
        case 'City': {
          doProject(18, {
            production: {
              megacredit: 1
            },
            tile: 'city'
          });
          break;
        }
        case 'Air Scrapping': {
          doProject(15, { param: ['venus'] });
          break;
        }
        case 'Buffer Gas': {
          doProject(16, { tr: 1 });
          break;
        }
      }
    }

    return this.export(game);
  }

  /**
   * Claim a milestone
   *
   * @param {string} id Game ID
   * @param {number} playerNum Player ID
   * @param {string} milestone Milestone to be claimed
   */
  @push(gameFilter)
  claimMilestone(id, playerNum, milestone) {
    const game = this.games[id];
    const player = this.getPlayer(game, playerNum);

    const claimedMilestone =
      milestone === 'Hoverlord'
        ? {
            qualifies: player =>
              player.cards.active
                .map(c => ({
                  card: c,
                  obj: this.cardStore.get(c.card)
                }))
                .concat(
                  player.cards.corp.map(c => ({
                    card: c,
                    obj: this.cardStore.get(c.card)
                  }))
                )
                .filter(c => c?.obj.resource === 'floater')
                .reduce((sum, c) => (sum += c.card.resource), 0) >= 7
          }
        : {
            Tharsis,
            Elysium,
            Hellas
          }[game.board].milestones.find(m => m.name === milestone);

    if (
      claimedMilestone.qualifies(player, game) &&
      game.milestones.length <= 3 &&
      player.resources.megacredit >= 8
    ) {
      game.resources(player, 'megacredit', -8);
      game.milestones.push({ player: playerNum, name: milestone });

      LogService.pushLog(
        id,
        new Log(playerNum, [' claimed the ', { milestone }, ' milestone.'])
      );
      console.log(`${id}:`, player.name, 'claimed the', milestone, 'milestone');

      game.nextTurn();
    }

    return this.export(game);
  }

  /**
   * Fund an award
   *
   * @param {string} id Game ID
   * @param {number} playerNum Player ID
   * @param {string} award Award to be funde
   */
  @push(gameFilter)
  fundAward(id, playerNum, award) {
    const game = this.games[id];
    const player = this.getPlayer(game, playerNum);

    if (
      game.awards.length <= 3 &&
      player.resources.megacredit >= 8 + 6 * game.awards.length
    ) {
      game.resources(player, 'megacredit', -(8 + 6 * game.awards.length));
      game.awards.push({ player: playerNum, name: award });

      LogService.pushLog(
        id,
        new Log(playerNum, [' funded the ', { award }, ' award.'])
      );
      console.log(`${id}:`, player.name, 'funded the', award, 'award');

      game.nextTurn();
    }

    return this.export(game);
  }

  /******************
   * Helper Methods *
   ******************/

  /**
   * Get the entire list of cards for the client
   *
   * @returns List of card numbers
   */
  getAllCardNumbers() {
    return Object.keys(this.cardStore).reduce(
      (cards, type) => ({
        ...cards,
        [type]: Object.keys(this.cardStore[type])
      }),
      {}
    );
  }

  /**
   * Check if the start phase is complete, i.e. all players have bought their cards, selected their
   * corps, and chosen their preludes (if applicable). If it's done, it will move to the action phase
   *
   * @param {Game} game The game
   */
  checkStartPhaseDone(game) {
    // Return if any players still haven't confirmed their corp
    if (game.players.some(player => player.cards.corp.length !== 1)) {
      return;
    }

    // Return if any players still haven't confirmed their preludes
    if (
      game.sets.includes('prelude') &&
      game.players.some(player => player.cards.prelude.length !== 2)
    ) {
      return;
    }

    // Return if any players still haven't confirmed their cards
    if (game.players.some(player => player.cards.buy.length > 0)) {
      return;
    }

    // Everybody's done, reveal corps
    const logs = [];
    game.forEachPlayerOrder((player, i) => {
      logs.push(
        new Log(i + 1, [
          ' is representing ',
          { corp: player.cards.corp[0].card },
          ` and bought ${player.cards.hand.length} projects.`
        ])
      );
    });

    LogService.pushLog(game.id, logs);

    game.forEachPlayerOrder(player => {
      // Apply corp tags, starting resources, and starting actions
      game.applyCorp(player);

      // Buy the cards they've selected
      player.resources.megacredit -= player.cards.hand.length * 3;
    });

    // Move to the next phase
    if (game.sets.includes('prelude')) {
      game.beginPreludePhase();
    } else {
      game.beginActionPhase();
    }
  }

  /**
   * Helper method to get the player that performed an action
   *
   * @param {Game} game The game
   * @returns Player that performed the action
   */
  getPlayer(game, player) {
    return game.players[player - 1];
  }

  /**
   * Helper method to get the next player who you draft to
   *
   * @param {Player} player The player doing the drafting
   * @param {Game} game The game
   * @returns The player to be passed to
   */
  getDraftTargetPlayer(player, game) {
    let p = player.number + (game.params.generation % 2 ? -1 : 1) - 1;
    if (p < 0) {
      p = game.players.length - 1;
    } else if (p >= game.players.length) {
      p = 0;
    }

    return game.players[p];
  }

  @push(gameFilter)
  loadPreset(id, preset) {
    const presetGame = require(`../../testing/presets/${preset}.json`);

    if (presetGame) {
      console.log('Loading', preset, 'preset into game', id);
      presetGame.id = id;

      // Remove game
      delete this.games[id];
      client.del(id);

      const game = new Game(this.cardStore, presetGame);
      this.registerGame(game, id);

      return this.export(game);
    }
  }

  /**
   * Helper method to do some common reductions to the game before sending it to clients.
   * @see Game.export
   * @param {Game} game The game
   */
  export(game) {
    // eslint-disable-next-line no-unused-vars
    const { cardStore, ...gameNoStore } = game;

    // Write to redis
    client.set(game.id, JSON.stringify(gameNoStore), () => {});

    return game.export();
  }
}

export default Service(GameService);
