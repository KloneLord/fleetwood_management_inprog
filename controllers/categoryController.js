import Category from '../models/categoryModel.js';
import { generateUniqueId } from './id_genController.js';
<<<<<<< HEAD

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
=======


const fixUsedByField = async () => {
    try {
        const result = await Category.updateMany(
            { $set: { usedBy: 0 } } // Set the default value
        );
        console.log(`${result.modifiedCount} documents updated.`);
    } catch (error) {
        console.error('Error fixing usedBy field:', error);
    }
};

fixUsedByField().then(r => -1);

// Fetch categories and subcategories for live dropdowns
export const getCategories = async (req, res) => {
    try {
        const { licenseNumber } = req.query;

        if (!licenseNumber) {
            return res.status(400).send({ error: 'License number is required.' });
        }

        const categories = await Category.find({ licenseNumber }).lean();

        // Group categories and their subcategories
        const groupedCategories = categories.reduce((acc, curr) => {
            const category = acc.find((c) => c.name === curr.name);
            if (category) {
                category.subcategories.push(curr.subcategories);
            } else {
                acc.push({
                    name: curr.name,
                    subcategories: [curr.subcategories],
                });
            }
            return acc;
        }, []);

        res.status(200).send(groupedCategories);
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).send({ error: 'Failed to fetch categories.' });
>>>>>>> de7a00b (dont do it)
    }
};

// Save category and subcategory
export const saveCategory = async (req, res) => {
    const { licenseNumber, username, name, subcategories } = req.body;

<<<<<<< HEAD

// Delete a category
=======
    try {
        if (!licenseNumber || !name || !subcategories) {
            return res.status(400).send({ message: 'All fields are required.' });
        }

        // Check for duplicate entries
        const existingEntry = await Category.findOne({
            licenseNumber,
            name,
            subcategories,
        });

        if (existingEntry) {
            return res
                .status(400)
                .send({ message: 'Duplicate category and subcategory not allowed.' });
        }

        // Generate fleetwood_id
        const fleetwood_id = await generateUniqueId('cat-');

        const newCategory = new Category({
            fleetwood_id,
            licenseNumber,
            name,
            subcategories,
            usedBy: 0,
        });

        await newCategory.save();
        res.status(201).send({ message: 'Category and Subcategory saved successfully!' });
    } catch (error) {
        console.error('Error saving category:', error);
        res.status(500).send({ error: 'Failed to save category.' });
    }
};

// Delete category row
>>>>>>> de7a00b (dont do it)
export const deleteCategory = async (req, res) => {
    const { fleetwood_id } = req.params;

    try {
<<<<<<< HEAD
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
=======
        const category = await Category.findOne({ fleetwood_id });
>>>>>>> de7a00b (dont do it)

        // Find the category by fleetwood_id
        const category = await Category.findOne({ fleetwood_id });
        if (!category) {
<<<<<<< HEAD
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
=======
            return res.status(404).send({ message: 'Category not found.' });
        }

        if (category.usedBy > 0) {
            return res
                .status(400)
                .send({ message: 'Cannot delete a category used by an inventory item.' });
        }

        await Category.deleteOne({ fleetwood_id });
        res.status(200).send({ message: 'Category deleted successfully!' });
    } catch (error) {
        console.error('Error deleting category:', error);
        res.status(500).send({ error: 'Failed to delete category.' });
>>>>>>> de7a00b (dont do it)
    }
};
