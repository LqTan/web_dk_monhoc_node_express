import { Router } from 'express';
import { UserController } from '../controllers/UserController';

const router = Router();

// Lấy tất cả users
router.get('/', UserController.getAllUsers);

// Lấy user theo id
router.get('/:id', UserController.getUserById);

// Tạo user mới
router.post('/', UserController.createUser);

// Cập nhật user
router.put('/:id', UserController.updateUser);

// Xóa user
router.delete('/:id', UserController.deleteUser);

export default router;
