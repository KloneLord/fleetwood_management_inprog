import MarkUp from '../models/markUpModel.js';

// List all markups
export const listMarkups = async (req, res) => {
    try {
        const markups = await MarkUp.find().lean();
        res.json(markups);
    } catch (err) {
        console.error('Error fetching markups:', err.message);
        res.status(500).json({ message: 'Failed to fetch markups' });
    }
};

// Add a new markup
export const addMarkup = async (req, res) => {
    try {
        const { title, modifier } = req.body;
        const markup = new MarkUp({ title, modifier });
        await markup.save();
        res.status(201).json({ message: 'Markup added successfully', markup });
    } catch (err) {
        console.error('Error adding markup:', err.message);
        res.status(500).json({ message: 'Failed to add markup' });
    }
};

// Update a markup
export const updateMarkup = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, modifier } = req.body;

        const markup = await MarkUp.findByIdAndUpdate(
            id,
            { title, modifier },
            { new: true }
        );

        if (!markup) return res.status(404).json({ message: 'Markup not found' });

        res.json({ message: 'Markup updated successfully', markup });
    } catch (err) {
        console.error('Error updating markup:', err.message);
        res.status(500).json({ message: 'Failed to update markup' });
    }
};
// Delete a markup
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
