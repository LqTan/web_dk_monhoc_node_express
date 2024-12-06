import ClassRegistration from '../models/ClassRegistration';
import Class from '../models/Class';
import { Transaction } from 'sequelize';
import User from '../models/User';
import Tuition from '../models/Tuition';
import Course from '../models/Course';

interface ClassWithCourse extends Class {
    Course?: Course;
}

export const ClassRegistrationService = {
  async registerClass(userId: string, classCode: string, transaction?: Transaction) {
    // Kiểm tra lớp học có còn slot không
    const classInstance = await Class.findByPk(classCode, {
        include: [{ model: Course }]
    }) as ClassWithCourse;
    if (!classInstance) {
      throw new Error('Không tìm thấy lớp học');
    }

    if (classInstance.currentStudents >= classInstance.maxStudents) {
      throw new Error('Lớp học đã đầy');
    }

    // Kiểm tra người dùng đã đăng ký lớp này chưa
    const existingRegistration = await ClassRegistration.findOne({
      where: {
        userId,
        classCode,
      }
    });

    if (existingRegistration) {
      throw new Error('Bạn đã đăng ký lớp học này rồi');
    }

    // Tạo đăng ký mới
    const registration = await ClassRegistration.create({
      userId,
      classCode,
      status: 'pending'
    }, { transaction });

    // Tăng số lượng học viên hiện tại
    await classInstance.increment('currentStudents', { transaction });

    // Tạo học phí cho lớp học
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 90); // Thêm 90 ngày cho hạn đóng tiền

    await Tuition.create({
      classCode,
      studentId: userId,
      amount: classInstance.Course?.price || 0,
      dueDate,
      status: 'pending'
    }, { transaction });

    return registration;
  },

  async getStudentRegistrations(userId: string) {
    return await User.findByPk(userId, {
        include: [{
            model: Class,
            as: 'registeredClasses',
            through: { attributes: [] }, // Loại bỏ các thuộc tính trung gian
            include: [{
                model: User,
                as: 'teacher',
                attributes: ['id', 'email']
            }]
        }]
    });
  },

  async getClassRegistrations(classCode: string) {
    return await ClassRegistration.findAll({
      where: { classCode },
      include: ['registeredStudents']
    });
  }
};