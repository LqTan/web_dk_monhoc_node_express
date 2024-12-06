import { Request, Response, RequestHandler } from 'express';
import { CourseCategoryService } from '../services/CourseCategoryService';

export class CourseCategoryController {
  // Lấy tất cả categories (đã có)
  static getAllCourseCategories: RequestHandler = async(req: Request, res: Response) => {
    try {
      const categories = await CourseCategoryService.getAllCourseCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: 'Lỗi server' });
    }
  }

  // Lấy category theo id
  static getCourseCategoryById: RequestHandler = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const category = await CourseCategoryService.getCourseCategoryById(id);
      if (!category) {
        res.status(404).json({ message: 'Không tìm thấy danh mục' });
        return;
      }
      res.json(category);
    } catch (error) {
      res.status(500).json({ message: 'Lỗi server' });
    }
  };

  // Tạo category mới
  static createCourseCategory: RequestHandler = async (req: Request, res: Response) => {
    try {
      const { name } = req.body;
      if (!name) {
        res.status(400).json({ message: 'Tên danh mục là bắt buộc' });
        return;
      }
      const category = await CourseCategoryService.createCourseCategory(name);
      res.status(201).json(category);
    } catch (error) {
      res.status(500).json({ message: 'Lỗi server' });
    }
  }

  // Cập nhật category
  static updateCourseCategory: RequestHandler = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { name } = req.body;
      if (!name) {
        res.status(400).json({ message: 'Tên danh mục là bắt buộc' });
        return;
      }
      const category = await CourseCategoryService.updateCourseCategory(id, name);
      if (!category) {
        res.status(404).json({ message: 'Không tìm thấy danh mục' });
        return;
      }
      res.json(category);
    } catch (error) {
      res.status(500).json({ message: 'Lỗi server' });
    }
  }

  // Xóa category
  static deleteCourseCategory: RequestHandler = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const success = await CourseCategoryService.deleteCourseCategory(id);
      if (!success) {
        res.status(404).json({ message: 'Không tìm thấy danh mục' });
        return;
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Lỗi server' });
    }
  }
};