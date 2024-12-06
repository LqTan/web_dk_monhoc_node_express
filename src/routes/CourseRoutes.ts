import { Router } from 'express';
import { CourseController } from '../controllers/CourseController';

const router = Router();

// Lấy tất cả khóa học
router.get('/', CourseController.getAllCourses);

// Lấy khóa học theo mã
router.get('/:courseCode', CourseController.getCourseByCode);

// Tạo khóa học mới
router.post('/', CourseController.createCourse);

// Cập nhật khóa học
router.put('/:courseCode', CourseController.updateCourse);

// Xóa khóa học
router.delete('/:courseCode', CourseController.deleteCourse);

export default router;