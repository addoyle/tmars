import Service, { sse, push } from './Service';
import CardStore from '../models/card.model';
import LogService from './log.service';
import Log from '../models/log.model';
import Game from '../models/game.model';
import shortid from 'shortid';
import { isString } from 'lodash';
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
  playCard(id, playerNum, playParams) {
    const game = this.games[id];
    const card = playParams.card;
    const player = this.getPlayer(game, playerNum);
    const playedCard = this.cardStore.project[card.card];
    const cardType = playedCard.constructor.name.toLowerCase();

    // TODO: Check if card is in hand
    // TODO: Check requirements
    // TODO: Check if player can afford card
    // TODO: Check if player can afford resources used

    // Decrease M€
    // TODO: Calculate resource usage (steel, titanium, etc.)
    player.resources.megacredit -= playedCard.cost;

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
    };

    // Perform card's action
    if (playedCard.action) {
      playedCard.action(player, game, done);

      // Server action didn't call done, call it now
      playedCard.action.length < 3 && done();
    }

    game.playerStatus?.done();

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

    // console.log(game.params.generation, this.getDraftTargetPlayer(game));

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
    const tile = game.tileFromId(tileId);
    const tileString = isString(game.playerStatus.tile)
      ? game.playerStatus.tile
      : 'special';

    // Set the tile
    tile.name = `${tileString}-placed`;
    tile.type = isString(game.playerStatus.tile)
      ? game.playerStatus.tile
      : game.playerStatus.tile.special;

    // Add a player marker
    if (game.playerStatus.tile !== 'ocean') {
      tile.player = player.number;
    }

    // Log the placement
    LogService.pushLog(
      game.id,
      new Log(player.number, [
        ` placed ${
          game.playerStatus.tile === 'ocean'
            ? 'an'
            : !isString(game.playerStatus.tile)
            ? 'the'
            : 'a'
        } ${
          isString(game.playerStatus.tile)
            ? game.playerStatus.tile
            : game.playerStatus.tile.special
        } `,
        { tile: tileString },
        ' tile.'
      ])
    );

    // Handle placement bonuses
    (tile.resources || [])
      .filter(r => r)
      .forEach(r => {
        // Resources on the space
        if (r === 'card') {
          game.drawCard(player);
        } else if (r === 'ocean') {
          game.promptTile('ocean', player);
        } else if (r.megacredit) {
          player.resources.megacredit += r.megacredit;
        } else {
          player.resources[r]++;
        }
      });

    // Ocean adjacencies
    player.resources.megacredit +=
      game.neighbors(tile).filter(t => t.name === 'ocean-placed').length * 2;

    // TODO: Trigger placement events

    game.playerStatus.done();

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
