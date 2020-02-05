import Service, { sse, push } from './Service';
import Player from '../models/player.model.js';

@sse
class GameService {
  players = [];

  @push
  addPlayer(name) {
    this.players.push(new Player(name));
  }
}

export default Service(GameService);