import { Router } from "express";
import messageController from "../controllers/messageController.js";
import  protect  from "../middleware/authMiddleware.js";

const router = Router();

const { allMessages, sendMessage } = messageController;

router.route('/:chatId').get(protect, allMessages);
router.route("/").post(protect, sendMessage);

export default router;