import { Request, Response, RequestHandler } from 'express';
import { PaymentService } from '../services/PaymentService';

interface AuthenticatedRequest extends Request {
  user?: { id: string };
}

export class PaymentController {
  static createVNPayPayment: RequestHandler = async (req: AuthenticatedRequest, res) => {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }

      const { amount, tuitionIds } = req.body;
      if (!amount || !tuitionIds || !Array.isArray(tuitionIds)) {
        res.status(400).json({ message: 'Invalid payment data' });
        return;
      }

      const paymentUrl = await PaymentService.createVNPayUrl(amount, tuitionIds, userId);
      res.json({ paymentUrl });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };
}