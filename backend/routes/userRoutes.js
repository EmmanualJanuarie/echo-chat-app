import { Router } from 'express';
import userController from '../controllers/registerUser.js';
import protect from '../middleware/authMiddleware.js';

const { regUser , authUser, updateUser, searchUsers, resetPassword, deleteUser } = userController;

const router = Router();

// user routing

router.route('/').post(regUser).get(protect, searchUsers);
router.route('/signin').post(authUser);
router.route('/:email').put(updateUser);
router.route('/:email/reset-password').put(resetPassword);
router.route('/:email/delete-user').delete(deleteUser); // Protect this route if needed

export default router;