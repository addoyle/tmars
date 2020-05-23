import { Router } from 'express';
import * as GameController from '../controllers/game.controller';
import GameService from '../services/game.service';
const router = Router();

// router.get('/:id', GameController.getGame);
// router.post('/', GameController.createGame);
// router.delete('/:id', GameController.deleteGame);

const validate = (req, res, next) => {
  if (!GameService.games[req.params.id]) {
    res.status(404).send('Game not found');
  } else {
    next();
  }
};

router.get('/:id/player', validate, GameController.getPlayer);
router.get('/:id/players', validate, GameController.getPlayers);
router.post('/:id/play-card', validate, GameController.playCard);
router.post('/:id/buy-card', validate, GameController.buyCard);
router.post('/:id/draft-card', validate, GameController.draftCard);
router.post('/:id/discard-unbought', validate, GameController.discardUnbought);
router.get('/:id/stream', validate, GameController.stream);
router.get('/card-numbers', GameController.getAllCardNumbers);

export default router;
