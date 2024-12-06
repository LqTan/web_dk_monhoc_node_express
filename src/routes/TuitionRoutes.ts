import { Router } from 'express';
import { TuitionController } from '../controllers/TuitionController';
import { authenticateJWT } from '../middleware/AuthMiddleware';

const router = Router();

// Lấy học phí chưa thanh toán của user
router.get('/unpaid', authenticateJWT, TuitionController.getUnpaidTuitions);
router.post('/mark-as-paid', authenticateJWT, TuitionController.markAsPaid);

export default router;