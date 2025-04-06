import { Router } from 'express';
import userController from '../controllers/registerUser.js';
import protect from '../middleware/authMiddleware.js';

const { regUser , authUser, updateUser, searchUsers, resetPassword} = userController;

const router = Router();

// user routing

router.route('/').post(regUser).get(protect, searchUsers);
router.route('/signin').post(authUser);
router.route('/:email').put(updateUser);
router.route('/:email/reset-password').put(resetPassword);

export default  router;