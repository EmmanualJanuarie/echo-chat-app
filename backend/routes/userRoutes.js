import { Router } from 'express';
import userController from "../controllers/registerUser.js";

const { regUser , authUser} = userController;

const router = Router();

// user routing

router.route('/').post(regUser);
router.route('/signin').post(authUser);

export default  router;