import express from 'express';
import Business from '../../models/businessModel.js';
import User from '../../models/userModel.js';
import bcrypt from 'bcryptjs';

const router = express.Router();

// Create a new business
router.post('/register', async (req, res) => {
    try {
        const { accountHolder, phone, email, password, businessName, abn, address, businessPhone, businessEmail } = req.body;

        // Check if the email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User with this email already exists' });
        }

        // Generate licenseNumber and defaultUser username
        const licenseNumber = Math.floor(10000000 + Math.random() * 90000000).toString(); // 8-digit number
        const defaultUsername = `Admin_Magos${Math.floor(1000 + Math.random() * 9000)}`; // Default username

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the default admin user
        const defaultUser = new User({
            username: defaultUsername,
            email,
            password: hashedPassword,
            phoneNumber: phone,
            role: 'admin', // Assign admin role
        });

        await defaultUser.save();

        // Create the business and link it to the default user
        const newBusiness = new Business({
            licenseNumber,
            accountHolder,
            phone,
            email,
            defaultUser: defaultUser._id, // Link admin user to business
            businessName,
            abn,
            address,
            businessPhone,
            businessEmail,
        });

        await newBusiness.save();

        res.status(201).json({
            message: 'Business registered successfully',
            licenseNumber,
            defaultUser: defaultUser.username,
        });
    } catch (error) {
        console.error('Error registering business:', error.message);
        res.status(500).json({ error: 'Failed to register business' });
    }
});

export default router;
