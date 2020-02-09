import Service, { sse, push } from './Service';
import Game from '../models/game.model.js';

@sse
class GameService {
  game = new Game();

  @push
  addPlayer(name) {
    this.game.players.push(new Player(name));
  }
}

export default Service(GameService);