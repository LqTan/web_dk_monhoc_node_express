import Class from '../models/Class';
import Course from '../models/Course';
import User from '../models/User';
import UserProfile from '../models/UserProfile';

export const ClassService = {
  // Lấy tất cả lớp học
  async getAllClasses() {
    return await Class.findAll({
      include: [{
        model: User,
        as: 'teacher',
        attributes: ['id', 'email'],
        include: [{            
            model: UserProfile,            
            attributes: ['id', 'fullName']              
        }]
      },
      {
        model: Course,
        attributes: ['courseCode', 'name']
      }]
    });
  },

  // Lấy lớp học theo mã
  async getClassByCode(classCode: string) {
    return await Class.findByPk(classCode, {
      include: [{
        model: User,
        as: 'teacher',
        attributes: ['id', 'email']
      },
      {
        model: Course,
        attributes: ['courseCode', 'name']
      }]
    });
  },

  // Tạo lớp học mới
  async createClass(classData: {
    classCode: string;
    teacherId: string;
    courseId: string;
    schedule: number[];
    startTime: string;
    endTime: string;
    room: string;
    maxStudents: number;
    startDate: Date;
    endDate: Date;
  }) {
    return await Class.create(classData);
  },

  // Cập nhật lớp học
  async updateClass(classCode: string, classData: {
    teacherId?: string;
    courseId?: string;
    schedule?: number[];
    startTime?: string;
    endTime?: string;
    room?: string;
    currentStudents?: number;
    maxStudents?: number;
    startDate?: Date;
    endDate?: Date;
  }) {
    const classInstance = await Class.findByPk(classCode);
    if (!classInstance) return null;
    return await classInstance.update(classData);
  },

  // Xóa lớp học
  async deleteClass(classCode: string) {
    const classInstance = await Class.findByPk(classCode);
    if (!classInstance) return false;
    await classInstance.destroy();
    return true;
  }
};