import { Router } from 'express';
import { ServicesController } from '../controllers/services.controller.ts';

const router = Router();

router.get('/', ServicesController.getServices);
router.get('/modus-operandi', ServicesController.getModusOperandi);
router.get('/:id', ServicesController.getServiceById);

export default router;
