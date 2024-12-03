import { createUniqueIdWithLicense } from '../utils/licenseAndId.js';
import IdGen from '../models/idGenModel.js'; // Your database model for storing IDs

export const generateAndSaveUniqueId = async (req, res) => {
    try {
        console.log('Incoming request to generate and save a unique ID:', req.body);

        const { prefix } = req.body;

        // Generate the unique ID and get the license number
        const { uniqueId, licenseNumber } = await createUniqueIdWithLicense(req, prefix);

        console.log(`Generated ID: ${uniqueId}, License Number: ${licenseNumber}`);

        // Save the unique ID to the database
        const savedRecord = await IdGen.create({
            generatedId: uniqueId,
            purpose: prefix,
            licenseNumber,
        });
        console.log('Unique ID saved successfully:', savedRecord);

        res.status(200).json({ uniqueId, savedRecord });
    } catch (error) {
        console.error('Error generating or saving unique ID:', error.message);
        res.status(500).json({ error: error.message });
    }
};
