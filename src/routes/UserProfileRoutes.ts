import { Router } from 'express';
import { UserProfileController } from '../controllers/UserProfileController';

const router = Router();

// Lấy tất cả profiles
router.get('/', UserProfileController.getAllProfiles);

// Lấy profile theo id
router.get('/:id', UserProfileController.getProfileById);

// Lấy profile theo userId
router.get('/user/:userId', UserProfileController.getProfileByUserId);

// Tạo profile mới
router.post('/', UserProfileController.createProfile);

// Cập nhật profile
router.put('/:id', UserProfileController.updateProfile);

// Xóa profile
router.delete('/:id', UserProfileController.deleteProfile);

export default router;