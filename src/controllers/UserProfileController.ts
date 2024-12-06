import { RequestHandler } from "express";
import { UserProfileService } from "../services/UserProfileService";

export class UserProfileController {
    // Lấy tất cả profiles
    static getAllProfiles: RequestHandler = async (req, res) => {
        try {
            const profiles = await UserProfileService.getAllProfiles();
            res.json(profiles);
        } catch (error) {
            res.status(500).json({ message: 'Lỗi server' });
        }
    }

    // Lấy profile theo id
    static getProfileById: RequestHandler = async (req, res) => {
        try {
            const { id } = req.params;
            const profile = await UserProfileService.getProfileById(id);
            if (!profile) {
                res.status(404).json({ message: 'Không tìm thấy profile' });
                return;
            }
            res.json(profile);
        } catch (error) {
            res.status(500).json({ message: 'Lỗi server' });
        }
    }

    // Lấy profile theo userId
    static getProfileByUserId: RequestHandler = async (req, res) => {
        try {
            const { userId } = req.params;
            const profile = await UserProfileService.getProfileByUserId(userId);
            if (!profile) {
                res.status(404).json({ message: 'Không tìm thấy profile' });
                return;
            }
            res.json(profile);
        } catch (error) {
            res.status(500).json({ message: 'Lỗi server' });
        }
    }

    // Tạo profile mới
    static createProfile: RequestHandler = async (req, res) => {
        try {
            const profileData = req.body;
            if (!profileData.fullName || !profileData.userId) {
                res.status(400).json({ message: 'Thiếu thông tin bắt buộc' });
                return;
            }
            const profile = await UserProfileService.createProfile(profileData);
            res.status(201).json(profile);
        } catch (error: any) {
            if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
                res.status(400).json({ message: error.message, errors: error.errors });
            } else {
                res.status(500).json({ message: error.message });
            }
        }
    }

    // Cập nhật profile
    static updateProfile: RequestHandler = async (req, res) => {
        try {
            const { id } = req.params;
            const profileData = req.body;
            const profile = await UserProfileService.updateProfile(id, profileData);
            if (!profile) {
                res.status(404).json({ message: 'Không tìm thấy profile' });
                return;
            }
            res.json(profile);
        } catch (error) {
            res.status(500).json({ message: 'Lỗi server' });
        }
    }

    // Xóa profile
    static deleteProfile: RequestHandler = async (req, res) => {
        try {
            const { id } = req.params;
            const success = await UserProfileService.deleteProfile(id);
            if (!success) {
                res.status(404).json({ message: 'Không tìm thấy profile' });
                return;
            }
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: 'Lỗi server' });
        }
    }
}
