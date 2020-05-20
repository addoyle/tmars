import { Router } from 'express';
import * as LogController from '../controllers/log.controller';
const router = Router();

router.get('/:id', LogController.getAll);
router.post('/:id', LogController.postLog);
router.get('/stream', LogController.stream);
router.get('/:id/stream', LogController.stream);

export default router;
