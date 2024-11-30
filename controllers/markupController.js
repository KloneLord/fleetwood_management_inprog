import MarkUp from '../models/markUpModel.js';
import { generateUniqueId } from './id_genController.js';

// Add a new markup
export const addMarkup = async (req, res) => {
    try {
        const { title, modifier, licenseNumber } = req.body;

        // Generate a unique fleetwood_id
        const fleetwood_id = await generateUniqueId('mup-');

        // Create and save markup
        const markup = new MarkUp({ title, modifier, fleetwood_id, licenseNumber });
        await markup.save();

        res.status(201).json({ message: 'Markup added successfully', markup });
    } catch (err) {
        console.error('Error adding markup:', err.message);
        res.status(500).json({ message: 'Failed to add markup' });
    }
};

// List all markups
export const listMarkups = async (req, res) => {
    try {
        const { licenseNumber } = req.query; // Pass licenseNumber via query
        if (!licenseNumber) {
            return res.status(400).json({ message: 'License number is required.' });
        }

        const markups = await MarkUp.find({ licenseNumber }).lean();
        res.json(markups);
    } catch (err) {
        console.error('Error fetching markups:', err.message);
        res.status(500).json({ message: 'Failed to fetch markups' });
    }
};

export const deleteMarkup = async (req, res) => {
    try {
        const { id } = req.params;

        const markup = await MarkUp.findByIdAndDelete(id);
        if (!markup) {
            return res.status(404).json({ message: 'Markup not found' });
        }

        res.status(200).json({ message: 'Markup deleted successfully' });
    } catch (err) {
        console.error('Error deleting markup:', err.message);
        res.status(500).json({ message: 'Failed to delete markup' });
    }
};