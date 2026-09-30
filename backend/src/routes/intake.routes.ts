import { Router } from 'express';
import { IntakeController } from '../controllers/intake.controller.ts';
import { evidenceUpload } from '../middleware/uploadMiddleware.ts';
import { validateBody, intakeSubmissionSchema } from '../middleware/validator.ts';

const router = Router();

router.post('/', validateBody(intakeSubmissionSchema), IntakeController.submitIntake);
router.get('/', IntakeController.getIntakeTickets);
router.get('/:caseRef', IntakeController.getIntakeTicketByRef);
router.post('/:caseRef/evidence', evidenceUpload.single('file'), IntakeController.uploadEvidence);

export default router;
