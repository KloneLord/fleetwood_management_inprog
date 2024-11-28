import Business from '../models/businessModel.js';
import User from '../models/userModel.js';
import { generateUniqueId } from './id_genController.js';

// Register a new business
export const registerBusiness = async (req, res) => {
    try {
        console.log('Starting business registration...');
        console.log('Received data:', req.body);

        const {
            accountHolder,
            phone,
            email,
            password,
            businessName,
            abn,
            address,
            businessPhone,
            businessEmail,
        } = req.body;

        // Generate a unique license number
        console.log('Generating unique license number...');
        const licenseNumber = await generateUniqueId('lic-');
        console.log('Generated license number:', licenseNumber);

        // Generate a unique fleetwood_id for the admin user
        console.log('Generating unique fleetwood_id for admin user...');
        const fleetwoodId = await generateUniqueId('id-');
        console.log('Generated fleetwood_id:', fleetwoodId);

        // Create the admin user directly in the businessController
        console.log('Creating admin user...');
        const adminUser = new User({
            fleetwood_id: fleetwoodId,
            username: `Magos${fleetwoodId.slice(-5)}`, // Generate username as Mago + last 5 digits of fleetwood_id
            email,
            password, // Keeping password unencrypted for now as requested
            role: 'admin',
            lic_no: licenseNumber,
        });
        await adminUser.save();
        console.log('Admin user created:', adminUser);

        // Create the business record
        console.log('Creating business record...');
        const business = new Business({
            _id: licenseNumber, // Use the generated license number as _id
            lic_no: licenseNumber,
            accountHolder,
            phone,
            email,
            defaultUser: adminUser._id, // Reference the admin user
            businessName,
            abn,
            address,
            businessPhone,
            businessEmail,
        });
        await business.save();
        console.log('Business record created:', business);

        // Respond with success
        res.status(201).json({
            message: 'Business registered successfully',
            licenseNumber,
            defaultUser: adminUser.username,
        });
    } catch (error) {
        console.error('Error registering business:', error.message);
        res.status(500).json({ error: 'Failed to register business' });
    }
};
