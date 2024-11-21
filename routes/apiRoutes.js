// routes/apiRoutes.js
import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { registerUser, loginUser, getUserProfile } from '../controllers/authController.js';

const router = express.Router();

// Public routes
router.post('/auth/register', registerUser);
router.post('/auth/login', loginUser);

// Protected routes
router.get('/auth/profile', authMiddleware, getUserProfile);

export default router;
