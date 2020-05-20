import GameService from '../services/game.service';

// FIXME: Temporary
import Game from '../models/game.model';
import Player from '../models/player.model';
setTimeout(() => {
  const game = new Game(GameService.cardStore);
  game.players = [
    new Player('Andy'),
    new Player('Frank'),
    new Player('Colin'),
    new Player('Larissa'),
    new Player('Adrian')
  ];
  game.players.forEach(player => game.setCorp(player));
  for (var j = 0; j < 10; j++) {
    game.players.forEach(player => game.drawCard(player));
  }

  GameService.games['123'] = game;
}, 2000);
setTimeout(() => {
  const game = new Game(GameService.cardStore);
  game.players = [
    new Player('Jim'),
    new Player('Bob'),
    new Player('Stan'),
    new Player('Carl')
  ];
  game.players.forEach(player => game.setCorp(player));
  for (var j = 0; j < 10; j++) {
    game.players.forEach(player => game.drawCard(player));
  }

  GameService.games['1234'] = game;
}, 2000);

/**
 * Get players
 *
 * @param {*} req
 * @param {*} res
 */
export function getPlayers(req, res) {
  if (!GameService.games[req.params.id]) {
    return res.sendStatus(404);
  }

  res.send(
    GameService.games[req.params.id].players.map(player => ({
      ...player,
      cards: {
        active: player.cards.active,
        automated: player.cards.automated,
        event: player.cards.event,
        prelude: player.cards.prelude
      }
    }))
  );
}

/**
 * Get active player
 *
 * @param {*} req
 * @param {*} res
 */
export function getPlayer(req, res) {
  if (!GameService.games[req.params.id]) {
    return res.sendStatus(404);
  }

  res.send(GameService.games[req.params.id].players[0]);
}

/**
 * Post a log
 *
 * @param {*} req
 * @param {*} res
 */
export function playCard(req, res) {
  GameService.playCard(`${req.params.id}`, req.body, res);
  res.send(200);
}

/**
 * Stream the game actions
 *
 * @param {*} req
 * @param {*} res
 */
export function stream(req, res) {
  if (!GameService.games[req.params.id]) {
    return res.sendStatus(404);
  }

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
