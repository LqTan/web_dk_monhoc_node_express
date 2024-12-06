import { Router } from 'express';
import { CourseCategoryController } from '../controllers/CourseCategoryController';

const router = Router();

// Lấy tất cả categories
router.get('/', CourseCategoryController.getAllCourseCategories);

// Lấy category theo id
router.get('/:id', CourseCategoryController.getCourseCategoryById);

// Tạo category mới
router.post('/', CourseCategoryController.createCourseCategory);

// Cập nhật category
router.put('/:id', CourseCategoryController.updateCourseCategory);

// Xóa category
router.delete('/:id', CourseCategoryController.deleteCourseCategory);

export default router;