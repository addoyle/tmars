import Service, { sse, push } from './Service';
import CardStore from '../models/card.model';
import shortid from 'shortid';

@sse
class GameService {
  cardStore = new CardStore();
  games = {};
  query;

  // @push
  // addPlayer(name) {
  //   this.game.players.push(new Player(name));
  // }

  createGame(game, id = shortid.generate()) {
    this.games[id] = game;
  }

  @push
  playCard(id, card) {
    const game = this.games[id];

    const player = this.getPlayer(game);
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

  @push
  toggleSelectCard(id, card, type) {
    const game = this.games[id];
    const player = this.getPlayer(game);

    player.cards[type] = player.cards[type].map(c =>
      card.card === c.card ? { ...c, select: !card.select } : c
    );

    return this.export(game);
  }

  @push
  buySelectedCards(id) {
    const game = this.games[id];
    const player = this.getPlayer(game);
    const cost = player.cards.buy.filter(card => card.select).length * 3;

    if (player.resources.mc < cost) {
      // TODO: Handle error
    }

    // Pay for the cards
    player.resources.megacredit -= cost;

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

    // Check if all players have finished, then move to the next phase
    if (game.players.every(player => player.cards.buy.length === 0)) {
      game.phase = 'action';
    }

    // console.log(game.params.generation, this.getDraftTargetPlayer(game));

    return this.export(game);
  }

  @push
  draftCard(id, card) {
    const game = this.games[id];

    const player = this.getPlayer(game);

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

  getAllCardNumbers() {
    return Object.keys(this.cardStore).reduce(
      (cards, type) => ({
        ...cards,
        [type]: Object.keys(this.cardStore[type])
      }),
      {}
    );
  }

  getPlayer(game) {
    return game.players[this.query.player - 1];
  }

  getDraftTargetPlayer(game) {
    let p = this.query.player + (game.params.generation % 2 ? -1 : 1);
    if (p < 0) {
      p = game.players.length - 1;
    } else if (p >= game.players.length) {
      p = 0;
    }

    return game.players[p];
  }

  export(game) {
    return game.export(this.query.player);
  }
}

export default Service(GameService);
