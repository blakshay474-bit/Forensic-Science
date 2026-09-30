import { Router } from 'express';
import { SystemController } from '../controllers/system.controller.ts';

const router = Router();

router.get('/health', SystemController.getHealth);
router.get('/stats', SystemController.getSystemStats);

export default router;
