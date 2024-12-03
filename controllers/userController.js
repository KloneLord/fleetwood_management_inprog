import User from '../models/usercreateModel.js';
import argon2 from 'argon2';
import { generateUniqueId } from '../utils/idGen.js';

/**
 * Register a new user.
 */
export const registerUser = async (req, res) => {
        try {
                const { username, password, email, role, name, phone, street, city, state, postcode, country, auth_code } = req.body;

                // Generate a unique Fleetwood ID
                const fleetwood_id = await generateUniqueId('FLWD');

                // Hash the password
                const hashedPassword = await argon2.hash(password);

                // Save the user to the database
                const newUser = await User.create({
                        fleetwood_id,
                        username,
                        password: hashedPassword,
                        email,
                        role,
                        name,
                        phone,
                        street,
                        city,
                        state,
                        postcode,
                        country,
                        auth_code,
                });

                res.status(201).json({ message: 'User registered successfully!', assignedRole: role, fleetwood_id });
        } catch (error) {
                console.error('Error registering user:', error);
                res.status(500).json({ message: error.message });
        }
};

/**
 * Login user and start a session.
 */
export const loginUser = async (req, res) => {
        try {
                const { username, password } = req.body;

                // Find the user by username
                const user = await User.findOne({ username });
                if (!user) {
                        return res.status(404).json({ message: 'User not found' });
                }

                // Verify the password
                const isPasswordValid = await argon2.verify(user.password, password);
                if (!isPasswordValid) {
                        return res.status(401).json({ message: 'Invalid credentials' });
                }

                // Start a session
                req.session.user = {
                        fleetwood_id: user.fleetwood_id,
                        role: user.role,
                        name: user.name,
                        auth_code: user.auth_code,
                        username: user.username,
                };

                res.status(200).json({ message: 'Login successful', redirectUrl: '/dashboard.html' });
        } catch (error) {
                console.error('Error logging in:', error);
                res.status(500).json({ message: error.message });
        }
};
