import User from '../models/User';
import UserProfile from '../models/UserProfile';
import bcrypt from 'bcrypt';

export const UserService = {
  // Lấy tất cả users
  async getAllUsers() {
    return await User.findAll({
      include: [UserProfile],
      attributes: { exclude: ['password'] }
    });
  },

  // Lấy user theo id
  async getUserById(id: string) {
    return await User.findByPk(id, {
      include: [UserProfile],
      attributes: { exclude: ['password'] }
    });
  },

  // Tạo user mới
  async createUser(userData: {
    email: string;
    password: string;
    role: string;
  }) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    return await User.create({
      ...userData,
      password: hashedPassword
    });
  },

  // Cập nhật user
  async updateUser(id: string, userData: {
    email?: string;
    password?: string;
    role?: string;
  }) {
    const user = await User.findByPk(id);
    if (!user) return null;

    if (userData.password) {
      userData.password = await bcrypt.hash(userData.password, 10);
    }

    return await user.update(userData);
  },

  // Xóa user
  async deleteUser(id: string) {
    const user = await User.findByPk(id);
    if (!user) return false;
    await user.destroy();
    return true;
  }
};