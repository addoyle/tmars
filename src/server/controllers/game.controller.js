import GameService from '../services/game.service';

const OK = 200;
const BAD_REQUEST = 400;

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
 * Get the current list of games
 *
 * @param {*} req
 * @param {*} res
 */
export function getGames(req, res) {
  GameService.getGames(games => res.send(games));
}

/**
 * Create a new game
 *
 * @param {*} req
 * @param {*} res
 */
export function createGame(req, res) {
  GameService.createGame(`${req.params.id}`, req.body);
  res.sendStatus(OK);
}

/**
 * Create a new game
 *
 * @param {*} req
 * @param {*} res
 */
export function deleteGame(req, res) {
  GameService.deleteGame(`${req.params.id}`, res);
}

/**
 * Play a card
 *
 * @param {*} req
 * @param {*} res
 */
export function playCard(req, res) {
  GameService.playCard(`${req.params.id}`, req.body.player, req.body, res);
  res.sendStatus(OK);
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
  res.sendStatus(OK);
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
    req.body.count
  );
  res.sendStatus(OK);
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
    req.body.single,
    res
  );
  res.sendStatus(OK);
}

/**
 * Draft a card
 *
 * @param {*} req
 * @param {*} res
 */
export function draftCard(req, res) {
  GameService.draftCard(`${req.params.id}`, req.body.player, res);
  res.sendStatus(OK);
}

/**
 * Buy selected cards
 *
 * @param {*} req
 * @param {*} res
 */
export function buySelectedCards(req, res) {
  GameService.buySelectedCards(`${req.params.id}`, req.body.player, res);
  res.sendStatus(OK);
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
  res.sendStatus(OK);
}

export function updateUI(req, res) {
  GameService.updateUI(`${req.params.id}`, req.body.player, req.body.ui);
  res.sendStatus(OK);
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
  res.send(
    GameService.placeTile(
      `${req.params.id}`,
      req.params.tileId,
      req.body.player
    )
  );
}

/**
 * Pick a choice
 *
 * @param {*} req
 * @param {*} res
 */
export function pickChoice(req, res) {
  res.send(
    GameService.pickChoice(`${req.params.id}`, req.body.player, req.body.choice)
  );
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
 * Claim a milestone
 *
 * @param {*} req
 * @param {*} res
 */
export function claimMilestone(req, res) {
  res.send(
    GameService.claimMilestone(
      `${req.params.id}`,
      req.body.player,
      req.body.milestone,
      res
    )
  );
}

/**
 * Fund an award
 *
 * @param {*} req
 * @param {*} res
 */
export function fundAward(req, res) {
  res.send(
    GameService.fundAward(
      `${req.params.id}`,
      req.body.player,
      req.body.award,
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
    GameService.loadPreset(req.params.id, req.query.preset);
    res.sendStatus(OK);
  } else {
    res.sendStatus(BAD_REQUEST);
  }
}
