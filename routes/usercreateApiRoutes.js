import express from 'express';
import {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    getUserProfile,
    addAccreditation,
    removeAccreditation,
    updateHoursWorked,
    updateBilledHours,
    updateUserSkills,
} from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Routes for managing users
router.get('/', authMiddleware, getAllUsers); // Get all users
router.get('/profile', authMiddleware, getUserProfile); // Get current logged-in user's profile
router.get('/:id', authMiddleware, getUserById); // Get user by ID
router.put('/:id', authMiddleware, updateUser); // Update user by ID
router.delete('/:id', authMiddleware, deleteUser); // Delete user by ID

// Accreditation-related routes
router.post('/profile/accreditation', authMiddleware, addAccreditation); // Add accreditation to current user
router.delete('/profile/accreditation/:id', authMiddleware, removeAccreditation); // Remove accreditation from current user

// Hours worked routes
router.put('/profile/hoursWorked', authMiddleware, updateHoursWorked); // Update hours worked for current user

// Billed hours routes
router.put('/profile/billedHours', authMiddleware, updateBilledHours); // Update billed hours for current user

// Skills management route
router.put('/profile/skills', authMiddleware, updateUserSkills); // Update skills for current user

// Logout route
router.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Error clearing session:', err);
            return res.status(500).json({ message: 'Failed to clear session' });
        }
        res.clearCookie('connect.sid'); // Clear session cookie
        res.status(200).json({ message: 'Session cleared successfully' });
    });
});

export default router;
