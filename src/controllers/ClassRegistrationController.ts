import { Request, Response, RequestHandler } from 'express';
import { ClassRegistrationService } from '../services/ClassRegistrationService';
import sequelize from '../config/database';

interface AuthenticatedRequest extends Request {
  user?: { id: string };
}

export class ClassRegistrationController {
  static registerClass: RequestHandler = async (req: AuthenticatedRequest, res) => {
    const transaction = await sequelize.transaction();
    try {
      const { classCode } = req.body;
      const userId = req.user?.id;

      if (!userId || !classCode) {
        res.status(400).json({ message: 'Thiếu thông tin bắt buộc' });
        return;
      }

      const registration = await ClassRegistrationService.registerClass(
        userId, 
        classCode,
        transaction
      );

      await transaction.commit();
      res.status(201).json(registration);
    } catch (error: any) {
      await transaction.rollback();
      res.status(400).json({ message: error.message });
    }
  };

  static getStudentRegistrations: RequestHandler = async (req: AuthenticatedRequest, res) => {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }

      const registrations = await ClassRegistrationService.getStudentRegistrations(userId);
      res.json(registrations);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
      console.log(error.message);
    }
  };
}