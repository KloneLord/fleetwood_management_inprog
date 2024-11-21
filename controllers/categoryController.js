import Category from '../models/categoryModel.js';
import express from 'express';
// Fetch all categories and subcategories
export const listCategories = async (req, res) => {
    try {
        const categories = await Category.find().lean();
        const subcategories = categories.flatMap(cat => cat.subcategories.map(sub => ({ _id: sub._id, name: sub.name })));
        res.json({ categories, subcategories });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching categories' });
    }
};

// Add category
export const addCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const existing = await Category.findOne({ name });
        if (existing) return res.status(400).json({ message: 'Category already exists' });

        const category = new Category({ name });
        await category.save();
        res.status(201).json(category);
    } catch (err) {
        res.status(500).json({ message: 'Error adding category' });
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
        const parentCategory = await Category.findById(parentId);
        if (!parentCategory) return res.status(404).json({ message: 'Parent category not found' });

        parentCategory.subcategories.push({ name });
        await parentCategory.save();
        res.status(201).json(parentCategory);
    } catch (err) {
        res.status(500).json({ message: 'Error adding subcategory' });
    }
};

// Delete subcategory
export const deleteSubcategory = async (req, res) => {
    try {
        const subcategoryId = req.params.id;
        const category = await Category.findOneAndUpdate(
            { 'subcategories._id': subcategoryId },
            { $pull: { subcategories: { _id: subcategoryId } } },
            { new: true }
        );
        if (!category) return res.status(404).json({ message: 'Subcategory not found' });

        res.json({ message: 'Subcategory deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting subcategory' });
    }
};

