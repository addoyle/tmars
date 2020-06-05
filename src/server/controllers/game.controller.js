import GameService from '../services/game.service';

// FIXME: Temporary games
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

  // Pick cards for people
  game.players.forEach((player, i) => {
    if (i > 0) {
      player.cards.corp = [player.cards.corp[0]];
      player.cards.prelude = [player.cards.prelude[0], player.cards.prelude[1]];
      player.cards.hand = [
        player.cards.buy[0],
        player.cards.buy[1],
        player.cards.buy[2],
        player.cards.buy[3],
        player.cards.buy[4]
      ];
      player.cards.buy = [];
    }
    player.cards.reveal = [{ card: '123' }];
  });

  game.players[3].cards.prelude = [{ card: 'P15' }, { card: 'P19' }];

  GameService.registerGame(game, '123');
}, 1000);
// setTimeout(() => {
//   const game = new Game(GameService.cardStore);
//   game.players = [
//     new Player('Jim'),
//     new Player('Bob'),
//     new Player('Stan'),
//     new Player('Carl')
//   ];
//   game.board = 'Elysium';
//   game.sets = ['corporate', 'promo'];

//   game.init();

//   GameService.registerGame(game, '1234');
// }, 1000);

/**
 * Get the current state of the game (should only be used on page load)
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
  GameService.playCard(`${req.params.id}`, req.body.player, req.body, res);
  res.sendStatus(200);
}

/**
 * Toggle the selection of a card
 *
 * @param {*} req
 * @param {*} res
 */
export function toggleSelectCard(req, res) {
  GameService.toggleSelectCard(
    `${req.params.id}`,
    req.body.player,
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
  GameService.draftCard(`${req.params.id}`, req.body.player, req.body, res);
  res.sendStatus(200);
}

/**
 * Buy selected cards
 *
 * @param {*} req
 * @param {*} res
 */
export function buySelectedCards(req, res) {
  GameService.buySelectedCards(`${req.params.id}`, req.body.player, res);
  res.sendStatus(200);
}

/**
 * Confirm a card selection
 *
 * @param {*} req
 * @param {*} res
 */
export function confirmSelection(req, res) {
  GameService.confirmSelection(
    `${req.params.id}`,
    req.body.player,
    req.params.type,
    res
  );
  res.sendStatus(200);
}

/**
 * Confirm a set of revealed cards, i.e. OK
 *
 * @param {*} req
 * @param {*} res
 */
export function confirmReveal(req, res) {
  GameService.confirmReveal(`${req.params.id}`, req.body.player, res);
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
