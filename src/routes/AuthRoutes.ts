import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';

const router = Router();

// Đăng ký người dùng mới
router.post('/register', AuthController.register);

// Đăng nhập người dùng
router.post('/login', AuthController.login);

export default router;