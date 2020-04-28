import GameService from '../services/game.service';
import Player from '../models/player.model';

// FIXME: Temporary
setTimeout(() => {
  GameService.game.players.push(new Player('Andy'));
  GameService.game.players.push(new Player('Frank'));
  GameService.game.players.push(new Player('Colin'));
  GameService.game.players.push(new Player('Larissa'));
  GameService.game.players.push(new Player('Adrian'));
  for (var i = 0; i < GameService.game.players.length; i++) {
    GameService.game.players[i].corporation = GameService.game.corps[i];
    for (var j = 0; j < 10; j++) {
      GameService.game.drawCard(i);
    }
  }
}, 2000);

/**
 * Get players
 *
 * @param {*} req
 * @param {*} res
 */
export function getPlayers(req, res) {
  res.send(GameService.game.players);
}

/**
 * Post a log
 *
 * @param {*} req
 * @param {*} res
 */
export function playCard(req, res) {
  // TODO

  res.sendStatus(200);
}

/**
 * Stream the game actions
 *
 * @param {*} req
 * @param {*} res
 */
export function stream(req, res) {
  GameService.stream(req, res);
}

/**
 * Get all the card numbers
 *
 * @param {*} req
 * @param {*} res
 */
export function getAllCardNumbers(req, res) {
  res.send(GameService.getAllCardNumbers());
}
