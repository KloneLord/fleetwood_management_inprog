import jwt from 'jsonwebtoken';
import { jwtSecret } from '../config/jwtConfig.js';
import Session from '../models/sessionModel.js';
import mongoose from 'mongoose';

// @desc Get session info for the current user
// @route GET /api/sessions/info
// @access Private
export const getSessionInfo = (req, res) => {
    if (!req.session || !req.session.user) {
        console.error('No session or user found in request.');
        return res.status(401).json({ message: 'Unauthorized: No active session' });
    }

    const { username, role, lic_no } = req.session.user; // Include lic_no
    let loginTime = req.session.loginTime;

    // Convert loginTime back to a Date object if it's a string
    if (typeof loginTime === 'string') {
        loginTime = new Date(loginTime);
    }

    if (!loginTime || isNaN(loginTime)) {
        console.error('Invalid loginTime in session:', loginTime);
        return res.status(500).json({ message: 'loginTime is not set or invalid in session' });
    }

    console.log('Session info retrieved successfully:', { username, role, lic_no, loginTime });

    res.status(200).json({
        username,
        role,
        lic_no, // Send lic_no to the client
        loginTime: loginTime.toISOString(), // Ensure ISO format for frontend
    });
};

// @desc Create a new session
// @route POST /api/sessions
// @access Private
export const createSession = async (req, res) => {
    const { userId, deviceInfo } = req.body;

    try {
        // Generate a JWT token for the session
        const token = jwt.sign({ userId }, jwtSecret, { expiresIn: '1h' });

        // Save session in the database
        const session = new Session({
            user: userId,
            token,
            deviceInfo,
            createdAt: new Date(),
        });

        await session.save();

        res.status(201).json({
            message: 'Session created successfully',
            token,
        });
    } catch (error) {
        console.error('Error creating session:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc Get all active sessions for a user
// @route GET /api/sessions
// @access Private
export const getSessions = async (req, res) => {
    const userId = req.user.userId;

    try {
        const sessions = await Session.find({ user: userId });

        res.status(200).json(sessions);
    } catch (error) {
        console.error('Error fetching sessions:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc Delete a session
// @route DELETE /api/sessions/:id
// @access Private
export const deleteSession = async (req, res) => {
    const sessionId = req.params.id;

    try {
        const session = await Session.findByIdAndDelete(sessionId);

        if (!session) {
            return res.status(404).json({ message: 'Session not found' });
        }

        res.status(200).json({ message: 'Session deleted successfully' });
    } catch (error) {
        console.error('Error deleting session:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc Delete all sessions for a user
// @route DELETE /api/sessions
// @access Private
export const deleteAllSessions = async (req, res) => {
    const userId = req.user.userId;

    try {
        await Session.deleteMany({ user: userId });

        res.status(200).json({ message: 'All sessions deleted successfully' });
    } catch (error) {
        console.error('Error deleting sessions:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};
