import { Router } from 'express';
import { ClassController } from '../controllers/ClassController';

const router = Router();

// Lấy tất cả lớp học
router.get('/', ClassController.getAllClasses);

// Lấy lớp học theo mã
router.get('/:classCode', ClassController.getClassByCode);

// Tạo lớp học mới
router.post('/', ClassController.createClass);

// Cập nhật lớp học
router.put('/:classCode', ClassController.updateClass);

// Xóa lớp học
router.delete('/:classCode', ClassController.deleteClass);

export default router;