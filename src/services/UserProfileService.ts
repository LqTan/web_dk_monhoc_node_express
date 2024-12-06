import UserProfile from '../models/UserProfile';
import User from '../models/User';

export const UserProfileService = {
  // Lấy tất cả profiles
  async getAllProfiles() {
    return await UserProfile.findAll({
      include: [{
        model: User,
        attributes: ['email']
      }]
    });
  },

  // Lấy profile theo id
  async getProfileById(id: string) {
    return await UserProfile.findByPk(id, {
      include: [{
        model: User,
        attributes: ['email']
      }]
    });
  },

  // Lấy profile theo userId
  async getProfileByUserId(userId: string) {
    return await UserProfile.findOne({ where: { userId } });
  },

  // Tạo profile mới
  async createProfile(profileData: {
    fullName: string;
    dateOfBirth?: Date;
    gender: string;
    occupation: string;
    workplace: string;
    phoneNumber: string;
    citizenId: string;
    avatar?: string;
    userId: string;
  }) {
    return await UserProfile.create(profileData);
  },

  // Cập nhật profile
  async updateProfile(id: string, profileData: {
    fullName?: string;
    dateOfBirth?: Date;
    gender?: string;
    occupation?: string;
    workplace?: string;
    phoneNumber?: string;
    citizenId?: string;
    avatar?: string;
  }) {
    const profile = await UserProfile.findByPk(id);
    if (!profile) return null;
    return await profile.update(profileData);
  },

  // Xóa profile
  async deleteProfile(id: string) {
    const profile = await UserProfile.findByPk(id);
    if (!profile) return false;
    await profile.destroy();
    return true;
  }
};