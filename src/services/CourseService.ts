import Course from '../models/Course';
import CourseCategory from '../models/CourseCategory';

export const CourseService = {
  // Lấy tất cả khóa học
  async getAllCourses() {
    return await Course.findAll({
      include: [CourseCategory]
    });
  },

  // Lấy khóa học theo mã
  async getCourseByCode(courseCode: string) {
    return await Course.findByPk(courseCode, {
      include: [CourseCategory]
    });
  },

  // Tạo khóa học mới
  async createCourse(courseData: {
    courseCode: string;
    name: string;
    price: number;
    categoryId: string;
    description?: string;
    imageUrl?: string;
  }) {
    return await Course.create(courseData);
  },

  // Cập nhật khóa học
  async updateCourse(courseCode: string, courseData: {
    name?: string;
    price?: number;
    categoryId?: string;
    description?: string;
    imageUrl?: string;
  }) {
    const course = await Course.findByPk(courseCode);
    if (!course) return null;
    return await course.update(courseData);
  },

  // Xóa khóa học
  async deleteCourse(courseCode: string) {
    const course = await Course.findByPk(courseCode);
    if (!course) return false;
    await course.destroy();
    return true;
  }
};