import { Request, Response, RequestHandler } from 'express';
import { TuitionService } from '../services/TuitionService';

interface AuthenticatedRequest extends Request {
  user?: { id: string };
}

export class TuitionController {
  static getUnpaidTuitions: RequestHandler = async (req: AuthenticatedRequest, res) => {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }

      const tuitions = await TuitionService.getUnpaidTuitions(userId);
      res.json(tuitions);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };
}