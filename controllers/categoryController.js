import Category from '../models/categoryModel.js';
import express from 'express';
// Fetch all categories and subcategories
export const listCategories = async (req, res) => {
    try {
        const categories = await Category.find().lean();
        const subcategories = categories.flatMap(cat =>
            cat.subcategories.map(sub => ({
                _id: sub._id,
                name: sub.name,
                parentId: cat._id.toString(), // Associate subcategories with their parent category
            }))
        );

        res.json({ categories, subcategories });
    } catch (err) {
        console.error('Error fetching categories:', err.message);
        res.status(500).json({ message: 'Error fetching categories' });
    }
};



// Add category
export const addCategory = async (req, res) => {
    try {
        const { name } = req.body;

        // Check if the category already exists
        const existingCategory = await Category.findOne({ name });
        if (existingCategory) {
            return res.status(400).json({ message: 'Category already exists' });
        }

        // Create and save new category
        const category = new Category({ name });
        await category.save();

        res.status(201).json({ message: 'Category added successfully', category });
    } catch (err) {
        console.error('Error adding category:', err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};


// Delete category
export const deleteCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const category = await Category.findByIdAndDelete(categoryId);
        if (!category) return res.status(404).json({ message: 'Category not found' });

        res.json({ message: 'Category deleted', subcategories: category.subcategories.map(sub => sub.name) });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting category' });
    }
};

// Add subcategory
export const addSubcategory = async (req, res) => {
    try {
        const { name, parentId } = req.body;

        // Validate parent category
        const parentCategory = await Category.findById(parentId);
        if (!parentCategory) {
            return res.status(404).json({ message: 'Parent category not found' });
        }

        // Check if the subcategory already exists under the parent
        const existingSubcategory = parentCategory.subcategories.find(sub => sub.name === name);
        if (existingSubcategory) {
            return res.status(400).json({ message: 'Subcategory already exists under this category' });
        }

        // Add the new subcategory
        parentCategory.subcategories.push({ name });
        await parentCategory.save();

        res.status(201).json({ message: 'Subcategory added successfully', parentCategory });
    } catch (err) {
        console.error('Error adding subcategory:', err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};




export const deleteSubcategory = async (req, res) => {
    try {
        const subcategoryId = req.params.id;

        // Find the parent category that contains the subcategory
        const category = await Category.findOneAndUpdate(
            { 'subcategories._id': subcategoryId }, // Locate subcategory by its _id
            { $pull: { subcategories: { _id: subcategoryId } } }, // Remove subcategory
            { new: true } // Return the updated document
        );

        if (!category) {
            return res.status(404).json({ message: 'Subcategory not found' });
        }

        res.status(200).json({ message: 'Subcategory deleted successfully', category });
    } catch (err) {
        console.error('Error deleting subcategory:', err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};


