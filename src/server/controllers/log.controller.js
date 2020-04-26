import LogService from '../services/log.service';

/**
 * Get all logs
 *
 * @param {*} req
 * @param {*} res
 */
export function getAll(req, res) {
  res.send(LogService.log);
}

/**
 * Post a log
 *
 * @param {*} req
 * @param {*} res
 */
export function postLog(req, res) {
  LogService.pushLog(req.body);
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
