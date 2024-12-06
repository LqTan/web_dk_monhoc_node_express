import { Request, Response, RequestHandler } from 'express';
import { UserService } from '../services/UserService';

export class UserController {
    // Lấy tất cả users
    static getAllUsers: RequestHandler = async (req, res) => {
        try {
            const users = await UserService.getAllUsers();
            res.json(users);
        } catch (error: any) {
            res.status(500).json({ message: 'Lỗi server' });
            // res.status(500).json({ message: error.message });
        }
    }

    // Lấy user theo id
    static getUserById: RequestHandler = async (req, res) => {
        try {
            const { id } = req.params;
            const user = await UserService.getUserById(id);
            if (!user) {
                res.status(404).json({ message: 'Không tìm thấy user' });
                return;
            }
            res.json(user);
        } catch (error) {
            res.status(500).json({ message: 'Lỗi server' });
        }
    }

    // Tạo user mới
    static createUser: RequestHandler = async (req, res) => {
        try {
            const { email, password, role } = req.body;
            if (!email || !password || !role) {
                res.status(400).json({ message: 'Thiếu thông tin bắt buộc' });
                return;
            }
            const user = await UserService.createUser({ email, password, role });
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ message: 'Lỗi server' });
        }
    }

    // Cập nhật user
    static updateUser: RequestHandler = async (req, res) => {
        try {
            const { id } = req.params;
            const { email, password, role } = req.body;
            const user = await UserService.updateUser(id, { email, password, role });
            if (!user) {
                res.status(404).json({ message: 'Không tìm thấy user' });
                return;
            }
            res.json(user);
        } catch (error) {
            res.status(500).json({ message: 'Lỗi server' });
        }
    }

    // Xóa user
    static deleteUser: RequestHandler = async (req, res) => {
        try {
            const { id } = req.params;
            const success = await UserService.deleteUser(id);
            if (!success) {
                res.status(404).json({ message: 'Không tìm thấy user' });
                return;
            }
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: 'Lỗi server' });
        }
    }
}
