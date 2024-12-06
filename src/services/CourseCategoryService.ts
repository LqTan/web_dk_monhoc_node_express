import CourseCategory from '../models/CourseCategory';

export const CourseCategoryService = {
  // Lấy tất cả categories (đã có)
  async getAllCourseCategories() {
    return await CourseCategory.findAll();
  },

  // Lấy category theo id (đã có)
  async getCourseCategoryById(id: string) {
    return await CourseCategory.findByPk(id);
  },

  // Tạo category mới (đã có)
  async createCourseCategory(name: string) {
    return await CourseCategory.create({ name });
  },

  // Cập nhật category
  async updateCourseCategory(id: string, name: string) {
    const category = await CourseCategory.findByPk(id);
    if (!category) return null;
    return await category.update({ name });
  },

  // Xóa category
  async deleteCourseCategory(id: string) {
    const category = await CourseCategory.findByPk(id);
    if (!category) return false;
    await category.destroy();
    return true;
  }
};