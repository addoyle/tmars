import Service, { sse, push } from './Service';
import Game from '../models/game.model.js';

@sse
class GameService {
  game = new Game();

  @push
  addPlayer(name) {
    this.game.players.push(new Player(name));
  }

  @push
  playCard(card) {}

  getAllCardNumbers() {
    return Object.keys(this.game.cards).reduce(
      (cards, type) => ({
        ...cards,
        [type]: Object.keys(this.game.cards[type])
      }),
      {}
    );
  }
}

export default Service(GameService);
