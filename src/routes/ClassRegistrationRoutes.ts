import { Router } from 'express';
import { ClassRegistrationController } from '../controllers/ClassRegistrationController';
import { authenticateJWT } from '../middleware/AuthMiddleware';

const router = Router();

router.post('/register', authenticateJWT, ClassRegistrationController.registerClass);
router.get('/my-registrations', authenticateJWT, ClassRegistrationController.getStudentRegistrations);

export default router;