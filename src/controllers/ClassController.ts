import { Request, Response, RequestHandler } from 'express';
import { ClassService } from '../services/ClassService';

export class ClassController {
  // Lấy tất cả lớp học
  static getAllClasses: RequestHandler = async (req, res) => {
    try {
      const classes = await ClassService.getAllClasses();
      res.json(classes);
    } catch (error: any) {
      // res.status(500).json({ message: 'Lỗi server' });
      res.status(500).json({ message: error.message });
    }
  };

  // Lấy lớp học theo mã
  static getClassByCode: RequestHandler = async (req, res) => {
    try {
      const { classCode } = req.params;
      const classInstance = await ClassService.getClassByCode(classCode);
      if (!classInstance) {
        res.status(404).json({ message: 'Không tìm thấy lớp học' });
        return;
      }
      res.json(classInstance);
    } catch (error) {
      res.status(500).json({ message: 'Lỗi server' });
    }
  };

  // Tạo lớp học mới
  static createClass: RequestHandler = async (req, res) => {
    try {
      const { 
        classCode, teacherId, courseId, schedule, startTime, 
        endTime, room, maxStudents, startDate, endDate 
      } = req.body;

      if (!classCode || !teacherId || !schedule || !startTime || 
          !endTime || !room || !maxStudents || !startDate || !endDate) {
        res.status(400).json({ message: 'Thiếu thông tin bắt buộc' });
        return;
      }

      const classInstance = await ClassService.createClass({
        classCode, teacherId, courseId, schedule, startTime,
        endTime, room, maxStudents,
        startDate: new Date(startDate),
        endDate: new Date(endDate)
      });

      res.status(201).json(classInstance);
    } catch (error: any) {
        res.status(500).json({ message: 'Lỗi server' });
        // res.status(500).json({ message: error.message });
    }
  };

  // Cập nhật lớp học
  static updateClass: RequestHandler = async (req, res) => {
    try {
      const { classCode } = req.params;
      const updateData = req.body;

      if (updateData.startDate) {
        updateData.startDate = new Date(updateData.startDate);
      }
      if (updateData.endDate) {
        updateData.endDate = new Date(updateData.endDate);
      }

      const classInstance = await ClassService.updateClass(classCode, updateData);
      if (!classInstance) {
        res.status(404).json({ message: 'Không tìm thấy lớp học' });
        return;
      }
      res.json(classInstance);
    } catch (error) {
      res.status(500).json({ message: 'Lỗi server' });
    }
  };

  // Xóa lớp học
  static deleteClass: RequestHandler = async (req, res) => {
    try {
      const { classCode } = req.params;
      const success = await ClassService.deleteClass(classCode);
      if (!success) {
        res.status(404).json({ message: 'Không tìm thấy lớp học' });
        return;
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Lỗi server' });
    }
  };
}