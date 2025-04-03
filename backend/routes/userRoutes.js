import { Router } from 'express';
import userController from "../controllers/registerUser.js";

const { regUser , authUser, updateUser, resetPassword} = userController;

const router = Router();

// user routing

router.route('/').post(regUser);
router.route('/signin').post(authUser);
router.route('/:email').put(updateUser);
router.route('/:email/reset-password').put(resetPassword);

export default  router;