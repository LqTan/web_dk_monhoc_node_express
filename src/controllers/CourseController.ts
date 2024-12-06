import { Request, Response, RequestHandler } from 'express';
import { CourseService } from '../services/CourseService';

export class CourseController {
  // Lấy tất cả khóa học
  static getAllCourses: RequestHandler = async (req, res) => {
    try {
      const courses = await CourseService.getAllCourses();
      res.json(courses);
    } catch (error) {
      res.status(500).json({ message: 'Lỗi server' });
    }
  };

  // Lấy khóa học theo mã
  static getCourseByCode: RequestHandler = async (req, res) => {
    try {
      const { courseCode } = req.params;
      const course = await CourseService.getCourseByCode(courseCode);
      if (!course) {
        res.status(404).json({ message: 'Không tìm thấy khóa học' });
        return;
      }
      res.json(course);
    } catch (error) {
      res.status(500).json({ message: 'Lỗi server' });
    }
  };

  // Tạo khóa học mới
  static createCourse: RequestHandler = async (req, res) => {
    try {
      const { courseCode, name, price, categoryId, description, imageUrl } = req.body;
      
      if (!courseCode || !name || !price || !categoryId) {
        res.status(400).json({ message: 'Thiếu thông tin bắt buộc' });
        return;
      }

      const course = await CourseService.createCourse({
        courseCode,
        name,
        price,
        categoryId,
        description,
        imageUrl
      });
      
      res.status(201).json(course);
    } catch (error) {
      res.status(500).json({ message: 'Lỗi server' });
    }
  };

  // Cập nhật khóa học
  static updateCourse: RequestHandler = async (req, res) => {
    try {
      const { courseCode } = req.params;
      const { name, price, categoryId, description, imageUrl } = req.body;

      const course = await CourseService.updateCourse(courseCode, {
        name,
        price,
        categoryId,
        description,
        imageUrl
      });

      if (!course) {
        res.status(404).json({ message: 'Không tìm thấy khóa học' });
        return;
      }
      
      res.json(course);
    } catch (error) {
      res.status(500).json({ message: 'Lỗi server' });
    }
  };

  // Xóa khóa học
  static deleteCourse: RequestHandler = async (req, res) => {
    try {
      const { courseCode } = req.params;
      const success = await CourseService.deleteCourse(courseCode);
      
      if (!success) {
        res.status(404).json({ message: 'Không tìm thấy khóa học' });
        return;
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Lỗi server' });
    }
  };
}