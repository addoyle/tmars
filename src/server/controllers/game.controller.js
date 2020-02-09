import GameService from '../services/game.service';
import Player from '../models/player.model';

// FIXME: Temporary
GameService.game.players.push(new Player('Andy'));
GameService.game.players.push(new Player('Frank'));
GameService.game.players.push(new Player('Colin'));
GameService.game.players.push(new Player('Larissa'));
GameService.game.players.push(new Player('Adrian'));
GameService.game.players[0].corporation = '001';
GameService.game.players[1].corporation = '010';
GameService.game.players[2].corporation = '009';
GameService.game.players[3].corporation = 'X02';
GameService.game.players[4].corporation = '004';


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