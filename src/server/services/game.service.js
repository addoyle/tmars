import Service, { sse, push } from './Service';
import CardStore from '../models/card.model';
import LogService from './log.service';
import Log from '../models/log.model';
import shortid from 'shortid';

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

    return id;
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
  playCard(id, playerNum, card) {
    const game = this.games[id];
    const player = this.getPlayer(game, playerNum);
    const playedCard = this.cardStore.project[card.card];
    const cardType = playedCard.constructor.name.toLowerCase();

    // TODO: Check if card is in hand
    // TODO: Check requirements

    // Decrease M€
    player.resources.megacredit -= playedCard.cost;

    // Set tags if card is not event
    if (cardType === 'event') {
      player.tags.event++;
    } else {
      playedCard.tags.forEach(tag => player.tags[tag]++);
    }

    // Put card in appropriate drawer, and remove from hand
    player.cards[cardType].push(card.card);
    player.cards.hand = player.cards.hand.filter(c => c !== card.card);

    // Perform card's action
    if (playedCard.serverAction) {
      playedCard.serverAction(player, game);
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

    // Reveal preludes
    game.forEachPlayerOrder((player, i) => {
      LogService.pushLog(
        game.id,
        new Log(i + 1, [
          ' is starting the game with ',
          { prelude: player.cards.prelude[0].card },
          ' and ',
          { prelude: player.cards.prelude[1].card },
          '.'
        ])
      );

      // Apply corp tags, starting resources, and starting actions
      game.applyCorp(player);

      // Apply prelude tags, resources, and actions
      game.applyPreludes(player);

      // Buy the cards they've selected
      player.resources.megacredit -= player.cards.hand.length * 3;
    });

    game.beginActionPhase();
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
    return game.export();
  }
}

export default Service(GameService);
