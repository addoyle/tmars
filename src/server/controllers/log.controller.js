import LogService from '../services/log.service';
import GameService from '../services/game.service';

/**
 * Get all logs
 *
 * @param {*} req
 * @param {*} res
 */
export function getAll(req, res) {
  res.send(GameService.games[req.params.id].log);
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
