import { Router } from 'express';
import * as LogController from './controllers/log.controller';
import * as GameController from './controllers/game.controller';
const router = Router();

router.get('/log', LogController.getAll);
router.post('/log', LogController.postLog);
router.get('/log/stream', LogController.stream);

router.get('/player', GameController.getPlayer);
router.get('/players', GameController.getPlayers);
router.get('/card-numbers', GameController.getAllCardNumbers);
router.post('/play', GameController.playCard);
export default router;
