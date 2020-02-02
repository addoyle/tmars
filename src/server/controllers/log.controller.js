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
    res.setHeader('Connection', 'keep-alive')
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Content-Type', 'text/event-stream');
    res.flushHeaders();

    LogService.addListener(res);

    res.on('close', () => {
        LogService.dropListener(res);
        res.end();
    });
}