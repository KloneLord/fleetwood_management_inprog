import express from 'express';
import {
    listCategories,
    addCategory,
    deleteCategory,
    addSubcategory,
    deleteSubcategory,
} from '../../controllers/categoryController.js';

const router = express.Router();

// Fetch all categories
router.get('/', listCategories);

// Add a new category
router.post('/', addCategory);

// Delete a category
router.delete('/:id', deleteCategory);

// Add a new subcategory
router.post('/subcategories', addSubcategory);

// Delete a subcategory
router.delete('/subcategories/:id', deleteSubcategory);

export default router;
