import { Router } from 'express';
import * as GameController from '../controllers/game.controller';
const router = Router();

// router.get('/:id', GameController.getGame);
// router.post('/', GameController.createGame);
// router.delete('/:id', GameController.deleteGame);

router.get('/:id/player', GameController.getPlayer);
router.get('/:id/players', GameController.getPlayers);
router.post('/:id/play-card', GameController.playCard);
router.get('/:id/stream', GameController.stream);

router.get('/card-numbers', GameController.getAllCardNumbers);

export default router;
