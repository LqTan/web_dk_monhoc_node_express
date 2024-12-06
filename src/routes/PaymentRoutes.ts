import { Router } from 'express';
import { PaymentController } from '../controllers/PaymentController';
import { authenticateJWT } from '../middleware/AuthMiddleware';

const router = Router();

router.post('/vnpay/create', authenticateJWT, PaymentController.createVNPayPayment);

export default router;