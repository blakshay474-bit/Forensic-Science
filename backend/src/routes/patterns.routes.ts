import { Router } from 'express';
import { PatternsController } from '../controllers/patterns.controller.ts';

const router = Router();

router.get('/heatmap', PatternsController.getHeatmap);
router.get('/correlation', PatternsController.getCorrelationMatrix);
router.get('/hotspots', PatternsController.getHotspots);

export default router;
