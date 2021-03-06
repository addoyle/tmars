import { Router } from 'express';
import * as GameController from '../controllers/game.controller';
import GameService from '../services/game.service';
const router = Router();

// Validate that the game exists
const validate = async (req, res, next) => {
  if (!(await GameService.getGame(req.params.id))) {
    res.status(404).send('Game not found');
  } else {
    next();
  }
};

router.get('/card-numbers', GameController.getAllCardNumbers);
router.get('/games', GameController.getGames);
router.get('/:id/loadPreset', GameController.loadPreset);
router.get('/:id', validate, GameController.getGame);
router.delete('/:id', validate, GameController.deleteGame);
router.post('/:id/create', validate, GameController.createGame);
router.post('/:id/play-card', validate, GameController.playCard);
router.post('/:id/play-prelude', validate, GameController.playPrelude);
router.post('/:id/card-action', validate, GameController.cardAction);
router.post(
  '/:id/toggle-select-card',
  validate,
  GameController.toggleSelectCard
);
router.post('/:id/pick-choice', validate, GameController.pickChoice);
router.post('/:id/draft-card', validate, GameController.draftCard);
router.post('/:id/buy-selected', validate, GameController.buySelectedCards);
router.post(
  '/:id/confirm-selection/:type',
  validate,
  GameController.confirmSelection
);
router.post('/:id/update-ui', validate, GameController.updateUI);
router.post('/:id/place-tile/:tileId', validate, GameController.placeTile);
router.post('/:id/pass-skip', validate, GameController.passSkip);
router.post('/:id/standard-project', validate, GameController.standardProject);
router.post('/:id/milestone', validate, GameController.claimMilestone);
router.post('/:id/award', validate, GameController.fundAward);

router.get('/:id/stream', validate, GameController.stream);

export default router;
