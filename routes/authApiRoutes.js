import express from 'express';
import {
    registerUser,
    loginUser,
    getUserProfile,
} from '../../controllers/authController.js';
import authMiddleware from '../../middleware/authMiddleware.js';

const router = express.Router();

// Registration route
router.post('/register', registerUser);

// Login route
router.post('/login', loginUser);

// Get user profile (protected route)
router.get('/profile', authMiddleware, getUserProfile);

// Get session data (username and login time) - NEW
router.get('/session', authMiddleware, (req, res) => {
    if (!req.session || !req.session.user) {
        return res.status(401).json({ error: 'Not authenticated' });
    }

    const { username, role } = req.session.user;
    const loginTime = req.session.loginTime;

    res.json({
        username,
        role,
        loginTime,
    });
    console.log('Session Data:', req.session);
});

export default router;
