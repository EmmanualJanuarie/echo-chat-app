import { Router } from 'express';
import userController from "../controllers/registerUser.js";

const router = Router();

// user routing

router.route('/').post(userController.regUser);//registration routing
router.route('/signin').post(userController.authUser);//login routing

export default  router;