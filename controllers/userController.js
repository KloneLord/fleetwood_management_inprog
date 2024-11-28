import User from '../models/userModel.js';
import { generateUniqueId } from './id_genController.js';

// Register a new user
export const registerUser = async (req, res) => {
        try {
                console.log('Starting user registration...');
                console.log('Received data:', req.body);

                const { username, email, password, role } = req.body;

                if (!username || !email || !password) {
                        return res.status(400).json({ message: 'All fields are required' });
                }

                // Generate unique Fleetwood ID
                console.log('Generating Fleetwood ID...');
                const fleetwood_id = await generateUniqueId('id-');
                console.log('Generated Fleetwood ID:', fleetwood_id);

                // Get the license number from the session (ensure this is implemented in session middleware)
                const lic_no = req.session.licenseNumber || 'lic-00000000'; // Default if license is not in session

                // Create and save the new user
                const newUser = new User({
                        fleetwood_id,
                        lic_no,
                        username,
                        email,
                        password, // No encryption here; hash logic can be added later
                        role: role || 'worker',
                });

                await newUser.save();
                console.log('User registered successfully:', newUser);

                res.status(201).json({ message: 'User registered successfully', fleetwood_id });
        } catch (error) {
                console.error('Error registering user:', error.message);
                res.status(500).json({ message: 'Failed to register user' });
        }
};
