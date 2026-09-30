import { Router } from 'express';
import { CasesController } from '../controllers/cases.controller.ts';
import { validateBody, newCaseSchema } from '../middleware/validator.ts';

const router = Router();

router.get('/', CasesController.getCases);
router.get('/:id', CasesController.getCaseById);
router.post('/', validateBody(newCaseSchema), CasesController.createCase);

export default router;
