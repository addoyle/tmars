import Service, { sse, push } from './Service';
import CardStore from '../models/card.model';
import shortid from 'shortid';

@sse
class GameService {
  // game = new Game();
  cardStore = new CardStore();
  games = {};

  // @push
  // addPlayer(name) {
  //   this.game.players.push(new Player(name));
  // }

  createGame(game, id = shortid.generate()) {
    this.games[id] = game;
  }

  /*
{
    "name": "Andy",
    "corp": {
    },
    "tr": 20,
    "resources": {
        "megacredit": 36,
        "steel": 0,
        "titanium": 0,
        "plant": 3,
        "power": 0,
        "heat": 0
    },
    "production": {
        "megacredit": 0,
        "steel": 0,
        "titanium": 0,
        "plant": 2,
        "power": 0,
        "heat": 0
    },
    "tags": {
        "building": 0,
        "space": 0,
        "power": 0,
        "science": 0,
        "jovian": 0,
        "earth": 0,
        "plant": 1,
        "microbe": 0,
        "animal": 0,
        "city": 0,
        "venus": 0,
        "event": 0
    },
    "tiles": {
        "city": 0,
        "greenery": 0,
        "special": 0
    },
    "cards": {
        "hand": [],
        "draft": [],
        "active": [],
        "automated": [],
        "event": [],
        "prelude": []
    }
}
*/

  @push
  playCard(id, card) {
    const game = this.games[id];

    const player = game.players[0];
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

    // res.send(player.cards);

    // console.log(game);
    // const player = game.players[0];

    return game.export();
  }

  @push
  buyCard(id, card) {
    const game = this.games[id];

    const player = game.players[0];
    player.resources.megacredit -= 3;

    player.cards.hand.push(card.card);
    player.cards.buy = player.cards.buy.filter(c => c !== card.card);

    return game.export();
  }

  @push
  discardUnbought(id) {
    const game = this.games[id];

    const player = game.players[0];
    game.cards.discard.concat(player.cards.buy);
    player.cards.buy = [];

    return game.export();
  }

  @push
  draftCard(id, card) {
    const game = this.games[id];

    const player = game.players[0];

    player.cards.buy.push(card.card);

    // Send draft cards to next player
    game.players[1].cards.onDeck.push(
      player.cards.draft.filter(c => c !== card.card)
    );

    // Grab the next set on deck
    if (player.cards.onDeck.length) {
      player.cards.draft = player.cards.onDeck.shift();
    }

    return game.export();
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
}

export default Service(GameService);
