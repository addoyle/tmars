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
  playCard(id, card, res) {
    const game = this.games[id];

    if (!game) {
      res.status(404).send('Game not found');
      return;
    }

    const player = game.players[0];
    const playedCard = this.cardStore.project[card.card];
    const cardType = playedCard.constructor.name.toLowerCase();

    // TODO: Check if card is in hand
    // TODO: Check requirements

    // Decrease M€
    player.resources.megacredit -= playedCard.cost;

    // Set tags if card is not event
    if (cardType !== 'event') {
      playedCard.tags.forEach(tag => player.tags[tag]++);
    }

    // Put played card on player
    player.cards[cardType].push(card.card);

    // Perform card's action
    if (playedCard.serverAction) {
      playedCard.serverAction(player, game);
    }

    // res.send(player.cards);

    // console.log(game);
    // const player = game.players[0];

    // eslint-disable-next-line no-unused-vars
    const { deck, discard, corps, preludes, ...strippedGame } = game;
    return strippedGame;
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
