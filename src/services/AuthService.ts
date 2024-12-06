import User from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserProfile from '../models/UserProfile';

const SECRET_KEY = 'your_secret_key'; // Thay thế bằng secret key của bạn

interface UserProfileData {
  fullName: string;
  gender: string;
  occupation: string;
  workplace: string;
  phoneNumber: string;
  citizenId: string;
  dateOfBirth?: Date;
  avatar?: string;
}

interface RegisterData {
  email: string;
  password: string;
  role: string;
  profile: UserProfileData;
}

export const AuthService = {
  // Đăng ký người dùng mới
  // async register(userData: { email: string; password: string; role: string }) {
  //   const hashedPassword = await bcrypt.hash(userData.password, 10);
  //   const user = await User.create({
  //     ...userData,
  //     password: hashedPassword
  //   });
  //   return user;
  // },

  async register(userData: RegisterData) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    
    // Tạo user mới
    const user = await User.create({
      email: userData.email,
      password: hashedPassword,
      role: userData.role
    });

    // Tạo user profile với các trường bắt buộc
    const userProfile = await UserProfile.create({
      fullName: userData.profile.fullName,
      gender: userData.profile.gender,
      occupation: userData.profile.occupation,
      workplace: userData.profile.workplace,
      phoneNumber: userData.profile.phoneNumber,
      citizenId: userData.profile.citizenId,
      dateOfBirth: userData.profile.dateOfBirth,
      avatar: userData.profile.avatar,
      userId: user.id
    });

    return { user, userProfile };
  },

  // Đăng nhập người dùng
  async login(email: string, password: string) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error('Email không tồn tại');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Mật khẩu không đúng');
    }

    const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, {
      expiresIn: '1h'
    });

    return { user, token };
  }
};