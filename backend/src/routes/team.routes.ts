import { Router } from 'express';
import { TeamController } from '../controllers/team.controller.ts';

const router = Router();

router.get('/', TeamController.getTeam);
router.get('/testimonials', TeamController.getTestimonials);

export default router;
