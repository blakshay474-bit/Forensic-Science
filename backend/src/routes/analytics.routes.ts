import { Router } from 'express';
import { AnalyticsController } from '../controllers/analytics.controller.ts';

const router = Router();

router.get('/kpis', AnalyticsController.getKpis);
router.get('/trends', AnalyticsController.getTrends);
router.get('/resolution', AnalyticsController.getResolutionHistory);
router.get('/radar', AnalyticsController.getRadarCapabilities);

export default router;
