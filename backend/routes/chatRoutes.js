import express  from 'express';
import protect from '../middleware/authMiddleware.js';
import chatController from '../controllers/chatController.js';

const { chatAccess, fetchChats, createGroupChat, removeFromGroup, renameGroup, addToGroup} = chatController;
const router = express.Router();

// Endpoints for chat interface
router.route('/').post(protect, chatAccess);
router.route('/').get(protect, fetchChats);
router.route('/group').post(protect, createGroupChat);
router.route('/renameGroup').put(protect, renameGroup);
router.route('/removeFromGroup').put(protect, removeFromGroup);
router.route('/addToGroup').put(protect, addToGroup);

export default router;