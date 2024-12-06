import { RequestHandler } from 'express';
import { AuthService } from '../services/AuthService';

export class AuthController {
  // Đăng ký người dùng mới
  static register: RequestHandler = async (req, res) => {
    try {
      const { email, password, role, profile } = req.body;
      if (!email || !password || !role) {
        res.status(400).json({ message: 'Thiếu thông tin bắt buộc' });
        return;
      }

      // Kiểm tra các trường bắt buộc của profile
      const requiredProfileFields = [
        'fullName',
        'gender',
        'occupation',
        'workplace',
        'phoneNumber',
        'citizenId'
      ];

      const missingFields = requiredProfileFields.filter(field => !profile?.[field]);
      console.log(missingFields);
      if (missingFields.length > 0) {
        res.status(400).json({ 
          message: `Thiếu thông tin profile bắt buộc: ${missingFields.join(', ')}` 
        });
        return;
      }

      const result = await AuthService.register({ email, password, role, profile });
      res.status(201).json(result);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  // Đăng nhập người dùng
  static login: RequestHandler = async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        res.status(400).json({ message: 'Thiếu thông tin bắt buộc' });
        return;
      }

      const { user, token } = await AuthService.login(email, password);
      res.json({ user, token });
    } catch (error: any) {
      res.status(401).json({ message: error.message });
    }
  };
}