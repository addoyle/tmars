import GameService from '../services/game.service';
import Player from '../models/player.model';

// FIXME: Temporary
GameService.players.push(new Player('Andy'));
GameService.players.push(new Player('Frank'));
GameService.players.push(new Player('Colin'));
GameService.players.push(new Player('Larissa'));
GameService.players.push(new Player('Adrian'));
GameService.players[0].corp = '001';
GameService.players[1].corp = '010';
GameService.players[2].corp = '009';
GameService.players[3].corp = 'X02';
GameService.players[4].corp = '004';

/**
 * Get players
 * 
 * @param {*} req 
 * @param {*} res 
 */
export function getPlayers(req, res) {
  res.send(GameService.players);
}

/**
 * Post a log
 * 
 * @param {*} req 
 * @param {*} res 
 */
export function playCard(req, res) {
  // TODO

  log.push(req.body);

  listeners.forEach(listener => {
    listener.write(`data: ${JSON.stringify(req.body)}\n\n`);
  })

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

  listeners.push(res);

  res.on('close', () => {
    if (listeners.indexOf(res >= 0)) {
      listeners.splice(listeners.indexOf(res), 1);
    }
    res.end();
  });
}