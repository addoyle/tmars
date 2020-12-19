import GameService from '../services/game.service';

/**
 * Get the current state of the game (should only be used on page load)
 *
 * @param {*} req
 * @param {*} res
 */
export async function getGame(req, res) {
  const game = await GameService.getAndExportGame(
    req.params.id,
    req.query.player
  );

  if (!game) {
    return res.sendStatus(404);
  }

  res.send(game);
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
 * Play a prelude
 *
 * @param {*} req
 * @param {*} res
 */
export function playPrelude(req, res) {
  GameService.playPrelude(
    `${req.params.id}`,
    req.body.player,
    req.body.card,
    res
  );
  res.sendStatus(200);
}

/**
 * Perform a card action
 *
 * @param {*} req
 * @param {*} res
 */
export function cardAction(req, res) {
  GameService.cardAction(
    `${req.params.id}`,
    req.body.player,
    req.body.card,
    req.body.index,
    req.body.opts
  );
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

/**
 * Place a tile
 *
 * @param {*} req
 * @param {*} res
 */
export function placeTile(req, res) {
  res.send(GameService.placeTile(`${req.params.id}`, req.params.tileId));
}

/**
 * Pick a player
 *
 * @param {*} req
 * @param {*} res
 */
export function pickPlayer(req, res) {
  res.send(GameService.pickPlayer(`${req.params.id}`, req.body.player));
}

/**
 * Skip or pass the current player's turn
 *
 * @param {*} req
 * @param {*} res
 */
export function passSkip(req, res) {
  res.send(GameService.passSkip(`${req.params.id}`));
}

/**
 * Fund a standard project
 *
 * @param {*} req
 * @param {*} res
 */
export function standardProject(req, res) {
  res.send(
    GameService.standardProject(
      `${req.params.id}`,
      req.body.player,
      req.body.project,
      req.body.resource,
      res
    )
  );
}

/**
 * For testing, load a preset which will replace the current game
 *
 * @param {*} req
 * @param {*} res
 */
export function loadPreset(req, res) {
  if (req.query.preset) {
    const presetGame = require(`../../testing/presets/${req.query.preset}.json`);

    if (presetGame) {
      console.log(
        'Loading',
        req.query.preset,
        'preset into game',
        req.params.id
      );
      presetGame.id = req.params.id;

      GameService.registerGame(presetGame, req.params.id);

      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } else {
    res.sendStatus(400);
  }
}
