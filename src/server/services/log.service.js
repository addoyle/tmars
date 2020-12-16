import Service, { sse, push } from './Service';
import GameService from './game.service';
// import Log from '../models/log.model.js';

@sse
class LogService {
  query;

  @push()
  pushLog(id, logs) {
    logs = Array.isArray(logs) ? logs : [logs];
    GameService.games[id].log = GameService.games[id].log.concat(logs);

    return logs;
  }
}

export default Service(LogService, { sse: true });
