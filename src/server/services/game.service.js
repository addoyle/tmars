import Service, { sse, push } from './Service';
import CardStore from '../models/card.model';
import LogService from './log.service';
import Log from '../models/log.model';
import Game from '../models/game.model';
import shortid from 'shortid';
import redis from 'redis';
import { promisify } from 'util';

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
   * @param {*} id Game ID
   */
  async getGame(id) {
    if (!this.games[id]) {
      this.games[id] = new Game(this.cardStore, JSON.parse(await redisGet(id)));
    }

    return this.games[id];
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
    const card = params.card;
    const player = this.getPlayer(game, playerNum);
    const playedCard = this.cardStore.project[card.card];
    const cardType = playedCard.constructor.name.toLowerCase();

    // TODO: Check if card is in hand
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
      return this.export(game);
    }

    LogService.pushLog(
      id,
      new Log(playerNum, [' played ', { project: card.card }, '.'])
    );

    // Set tags if card is not event
    if (cardType === 'event') {
      player.tags.event++;
    } else {
      playedCard.tags.forEach(tag => player.tags[tag]++);
    }

    const done = () => {
      // Put card in appropriate drawer, and remove from hand
      player.cards[cardType].push(card.card);
      player.cards.hand = player.cards.hand.filter(c => c.card !== card.card);

      // Trigger card-played events
      game.fire('onCardPlayed', player);

      game.playerStatus?.done();

      if (game.phase === 'action') {
        game.nextTurn();
      }
    };

    // Perform card's action
    if (playedCard.action) {
      playedCard.action(player, game, done);

      // Server action didn't call done, call it now
      playedCard.action.length < 3 && done();
    } else {
      done();
    }

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
    const playedCard = this.cardStore.prelude[card.card];

    // Check to make sure the user can play this prelude
    if (
      !player.cards.prelude.filter(c => card.card === c.card).length ||
      player.cards.prelude.filter(c => card.card === c.card)[0].disabled
    ) {
      return this.export(game);
    }

    LogService.pushLog(
      id,
      new Log(playerNum, [' revealed ', { prelude: card.card }, '.'])
    );

    // Set tags
    playedCard.tags.forEach(tag => player.tags[tag]++);

    const done = () => {
      // Mark prelude as played
      player.cards.prelude.find(
        prelude => prelude.card === card.card
      ).disabled = true;

      // If both preludes have been played, advance to the next player
      if (!player.cards.prelude.filter(prelude => !prelude.disabled).length) {
        game.nextTurn();

        // All preludes played, start action phase
        if (
          game.players.every(player =>
            player.cards.prelude.every(prelude => prelude.disabled)
          )
        ) {
          // Enable preludes
          game.players.forEach(player =>
            player.cards.prelude.forEach(prelude => (prelude.disabled = false))
          );

          game.beginActionPhase();
        }
      }
    };

    // Perform card's action
    if (playedCard.action) {
      playedCard.action(player, game, done);

      // Server action didn't call done, call it now
      playedCard.action.length < 3 && done();
    }

    return this.export(game);
  }

  /**
   * Toggles selection of a card
   *
   * @param {string} id Game ID
   * @param {number} playerNum Player number
   * @param {object} card Card to toggle
   * @param {string} type Card type. One of [project, corp, prelude]
   * @returns Game status
   */
  @push(gameFilter)
  toggleSelectCard(id, playerNum, card, type) {
    const game = this.games[id];
    const player = this.getPlayer(game, playerNum);

    player.cards[type] = player.cards[type].map(c =>
      card.card === c.card ? { ...c, select: !card.select } : c
    );

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

    // Move bought cards into hand
    player.cards.hand = player.cards.hand.concat(
      player.cards.buy
        .filter(card => card.select)
        .map(card => ({ card: card.card }))
    );

    // Move unbought cards into discard pile
    game.cards.discard = game.cards.discard.concat(
      player.cards.buy
        .filter(card => !card.select)
        .map(card => ({ card: card.card }))
    );

    // Clear out buy cards
    player.cards.buy = [];

    if (game.phase === 'start') {
      this.checkStartPhaseDone(game);
    }

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
  draftCard(id, playerNum, card) {
    const game = this.games[id];
    const player = this.getPlayer(game, playerNum);

    player.cards.buy.push(card.card);

    // Send draft cards to next player
    console.log(this.getDraftTargetPlayer);
    // this.getDraftTargetPlayer(game).cards.onDeck.push(
    //   player.cards.draft.filter(c => c !== card.card)
    // );

    // Grab the next set on deck
    if (player.cards.onDeck.length) {
      player.cards.draft = player.cards.onDeck.shift();
    }

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

    player.cards[type] = player.cards[type]
      .filter(card => card.select)
      .map(card => ({ ...card, select: false }));

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

    return this.export(game);
  }

  /**
   * Place a tile
   *
   * @param {string} id Game ID
   * @param {number} tileId Tile id
   */
  @push(gameFilter)
  placeTile(id, tileId) {
    const game = this.games[id];
    const player = game.playerStatus.player;
    const area = game.tileFromId(tileId);

    game.placeTile(
      player,
      area,
      game.playerStatus.tile,
      game.playerStatus.done
    );

    return this.export(game);
  }

  @push(gameFilter)
  pickPlayer(id, pickedPlayerID) {
    const game = this.games[id];
    const player = game.playerStatus.player;
    const pickedPlayer = this.getPlayer(game, pickedPlayerID);
    if (pickedPlayerID) {
      // Log the placement
      LogService.pushLog(
        game.id,
        new Log(player.number, [
          ' ',
          ...game.playerStatus.logSnippet,
          ' ',
          { player: pickedPlayerID },
          '.'
        ])
      );
    }

    game.playerStatus.done(pickedPlayer);

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
      player.passed = true;
      player.firstAction = false;

      // Log the pass
      LogService.pushLog(game.id, new Log(player.number, [' passed.']));
    } else {
      // Log the skip
      LogService.pushLog(game.id, new Log(player.number, [' skipped.']));
    }

    game.nextTurn();

    return this.export(game);
  }

  @push(gameFilter)
  standardProject(id, playerNum, project, resource, res) {
    const game = this.games[id];
    const player = this.getPlayer(game, playerNum);

    if (game.turn === playerNum) {
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
            player.resources[resource] -= player.rates[resource];
          } else {
            player.resources.megacredit -= cost;
          }

          const done = () => game.nextTurn();
          action(done);
          if (action.length === 0) {
            done();
          }
        } else {
          res.sendStatus(403);
        }
      };

      switch (project) {
        case 'Sell Patents': {
          doProject(0, done => done(), player.cards.hand.length);
          break;
        }
        case 'Power Plant': {
          doProject(11, () => game.production(player, 'power', 1));
          break;
        }
        case 'Asteroid': {
          doProject(14, done => game.param(player, 'temperature', done));
          break;
        }
        case 'Aquifer': {
          doProject(18, done => game.promptTile(player, 'ocean', done));
          break;
        }
        case 'Greenery': {
          doProject(23, done => game.promptTile(player, 'greenery', done));
          break;
        }
        case 'City': {
          doProject(18, done => {
            game.production(player, 'megacredit', 1);
            game.promptTile(player, 'city', done);
          });
          break;
        }
        case 'Air Scrapping': {
          doProject(15, done => game.param(player, 'venus', done));
          break;
        }
        case 'Buffer Gas': {
          doProject(16, () => game.tr(player, 1));
          break;
        }
      }
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
   * @param {Game} game The game
   * @returns The next player
   */
  getDraftTargetPlayer(game) {
    let p = this.query.player + (game.params.generation % 2 ? -1 : 1);
    if (p < 0) {
      p = game.players.length - 1;
    } else if (p >= game.players.length) {
      p = 0;
    }

    return game.players[p];
  }

  /**
   * Helper method to do some common reductions to the game before sending it to clients.
   * @see Game.export
   * @param {Game} game The game
   */
  export(game) {
    // eslint-disable-next-line no-unused-vars
    const { cardStore, ...gameNoStore } = game;

    client.set(game.id, JSON.stringify(gameNoStore), () => {});

    return game.export();
  }
}

export default Service(GameService);
