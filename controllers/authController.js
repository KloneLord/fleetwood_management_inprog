import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import { jwtSecret } from '../config/jwtConfig.js';


// Log in a user
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        if (password !== user.password) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Store the user information in the session, including `lic_no`
        req.session.user = {
            id: user._id,
            username: user.username,
            email: user.email,
            lic_no: user.lic_no, // Include the license number
            role: user.role,
        };
        req.session.loginTime = new Date(); // Store login time

        console.log('Session created on login:', req.session);

        res.status(200).json({ message: 'Login successful', user: req.session.user });
    } catch (err) {
        console.error('Error logging in user:', err.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// Register a new user
export const registerUser = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const newUser = new User({
            username,
            email,
            password, // Save password directly (not recommended in production)
            role: role || 'worker', // Default role is 'worker' if not provided
        });
        await newUser.save();

        const token = jwt.sign({ id: newUser._id, role: newUser.role }, jwtSecret, { expiresIn: '1h' });

        res.status(201).json({ token });
    } catch (err) {
        console.error('Error registering user:', err.message);
        res.status(500).json({ message: 'Server error' });
    }
};


// Get user profile
export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ user });
    } catch (err) {
        console.error('Error fetching user profile:', err.message);
        res.status(500).json({ message: 'Server error' });
    }
};
