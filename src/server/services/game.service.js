import Service, { sse, push } from './Service';
import Game from '../models/game.model.js';

@sse
class GameService {
  game = new Game();

  @push
  addPlayer(name) {
    this.game.players.push(new Player(name));
  }

  getAllCardNumbers() {
    const normalize = card =>
      isNaN(card) ? card : card.toString().padStart(3, '0');

    return {
      corp: this.game.corps.map(card => normalize(card.number)).sort(),
      prelude: this.game.preludes.map(card => normalize(card.number)).sort(),
      project: this.game.deck.map(card => normalize(card.number)).sort()
    };
  }
}

export default Service(GameService);
