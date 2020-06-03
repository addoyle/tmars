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
  game.board = 'Tharsis';
  game.sets = ['corporate', 'promo', 'prelude', 'venus'];

  game.init();

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
  game.board = 'Elysium';
  game.sets = ['corporate', 'promo'];

  game.init();

  GameService.games['1234'] = game;
}, 2000);

/**
 * Get players
 *
 * @param {*} req
 * @param {*} res
 */
export function getGame(req, res) {
  if (!GameService.games[req.params.id]) {
    return res.sendStatus(404);
  }

  const game = GameService.games[req.params.id];

  // TODO: Temporary, to be replaced by actual auth
  const activePlayer = req.query.player;

  res.send(game.export(activePlayer));
}

/**
 * Play a card
 *
 * @param {*} req
 * @param {*} res
 */
export function playCard(req, res) {
  GameService.playCard(`${req.params.id}`, req.body, res);
  res.sendStatus(200);
}

/**
 * Buy a card
 *
 * @param {*} req
 * @param {*} res
 */
export function toggleSelectCard(req, res) {
  GameService.toggleSelectCard(
    `${req.params.id}`,
    req.body.card,
    req.body.type,
    res
  );
  res.sendStatus(200);
}

/**
 * Draft a card
 *
 * @param {*} req
 * @param {*} res
 */
export function draftCard(req, res) {
  GameService.draftCard(`${req.params.id}`, req.body, res);
  res.sendStatus(200);
}

/**
 * Discard unbought cards
 *
 * @param {*} req
 * @param {*} res
 */
export function buySelectedCards(req, res) {
  GameService.buySelectedCards(`${req.params.id}`, res);
  res.sendStatus(200);
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
