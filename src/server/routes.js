import { Router } from 'express';
import * as LogController from './controllers/log.controller';
const router = Router();

router.get('/log', LogController.getAll);
router.post('/log', LogController.postLog);
router.get('/log/stream', LogController.stream);

export default router;