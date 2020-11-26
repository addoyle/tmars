import LogService from '../services/log.service';
import GameService from '../services/game.service';

/**
 * Get all logs
 *
 * @param {*} req
 * @param {*} res
 */
export async function getAll(req, res) {
  const game = await GameService.getGame(req.params.id);
  res.send(game.log);
}

/**
 * Post a log
 *
 * @param {*} req
 * @param {*} res
 */
export function postLog(req, res) {
  LogService.pushLog(req.params.id, { ...req.body, system: false });
  res.sendStatus(200);
}

/**
 * Stream the log feed
 *
 * @param {*} req
 * @param {*} res
 */
export function stream(req, res) {
  LogService.stream(req, res);
}
