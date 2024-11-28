import Category from '../models/categoryModel.js';
import { generateUniqueId } from './id_genController.js';

// List all categories
export const listCategories = async (req, res) => {
    try {
        const { licenseNumber } = req.query; // Get licenseNumber from query

        if (!licenseNumber) {
            return res.status(400).json({ message: 'License number is required.' });
        }

        const categories = await Category.find({ licenseNumber }).lean();
        res.status(200).json(categories);
    } catch (err) {
        console.error('Error fetching categories:', err.message);
        res.status(500).json({ message: 'Failed to fetch categories' });
    }
};

export const addCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const { lic_no: licenseNumber } = req.session;

        if (!licenseNumber) {
            return res.status(400).json({ message: 'License number is required.' });
        }

        const fleetwood_id = await generateUniqueId('cat-');

        const category = new Category({ name, fleetwood_id, licenseNumber });
        await category.save();

        res.status(201).json({ message: 'Category added successfully', category });
    } catch (err) {
        console.error('Error adding category:', err.message);
        res.status(500).json({ message: 'Failed to add category' });
    }
};



// Delete a category
export const deleteCategory = async (req, res) => {
    try {
        const { id: fleetwood_id } = req.params; // Match by fleetwood_id

        // Find and delete the category by fleetwood_id
        const category = await Category.findOneAndDelete({ fleetwood_id });

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (err) {
        console.error('Error deleting category:', err.message);
        res.status(500).json({ message: 'Failed to delete category' });
    }
};

// Add a subcategory
export const addSubcategory = async (req, res) => {
    try {
        const { fleetwood_id, subcategoryName } = req.body;

        // Find the category by fleetwood_id
        const category = await Category.findOne({ fleetwood_id });
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        // Add the new subcategory
        category.subcategories.push({ name: subcategoryName });
        await category.save();

        res.status(200).json({ message: 'Subcategory added successfully', category });
    } catch (err) {
        console.error('Error adding subcategory:', err.message);
        res.status(500).json({ message: 'Failed to add subcategory' });
    }
};

// Delete a subcategory
export const deleteSubcategory = async (req, res) => {
    try {
        const { id: fleetwood_id } = req.params; // Match by fleetwood_id
        const { subcategoryName } = req.body;

        // Find the category by fleetwood_id
        const category = await Category.findOne({ fleetwood_id });
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        // Remove the subcategory by name
        const subcategoryIndex = category.subcategories.findIndex(
            (sub) => sub.name === subcategoryName
        );
        if (subcategoryIndex === -1) {
            return res.status(404).json({ message: 'Subcategory not found' });
        }

        category.subcategories.splice(subcategoryIndex, 1);
        await category.save();

        res.status(200).json({ message: 'Subcategory deleted successfully', category });
    } catch (err) {
        console.error('Error deleting subcategory:', err.message);
        res.status(500).json({ message: 'Failed to delete subcategory' });
    }
};
