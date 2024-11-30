import IdGen from '../models/idGenModel.js';

// Generate a unique ID
export const generateUniqueId = async (prefix) => {
    console.log(`Starting ID generation with prefix: ${prefix}`);
    let uniqueId;
    let success = false;

    while (!success) {
        try {
            // Generate an 8-digit random number
            const randomNumber = Math.floor(10000000 + Math.random() * 90000000);
            uniqueId = `${prefix}${randomNumber}`;
            console.log(`Generated unique ID: ${uniqueId}`);

            // Attempt to save the unique ID to the id_gen collection
            console.log(`Saving unique ID: ${uniqueId} to the database...`);
            await IdGen.create({ generatedId: uniqueId, purpose: prefix });
            console.log(`Successfully saved unique ID: ${uniqueId}`);
            success = true; // Exit the loop if successful
        } catch (error) {
            if (error.code === 11000) {
                console.warn(`Duplicate ID detected: ${uniqueId}. Retrying...`);
            } else {
                console.error('Error generating ID:', error.message);
                throw new Error('Failed to generate unique ID');
            }
        }
    }



    console.log(`Final unique ID generated and saved: ${uniqueId}`);
    return uniqueId;
};
