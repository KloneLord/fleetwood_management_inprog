import express from 'express';
import {
    listCategories,
    addCategory,
    deleteCategory,
    addSubcategory,
    deleteSubcategory
} from '../../controllers/categoryController.js';

const router = express.Router();

router.get('/', listCategories); // Fetch categories
router.post('/', addCategory); // Add a category
router.delete('/:id', deleteCategory); // Delete a category
router.post('/subcategories', addSubcategory); // Add a subcategory
router.delete('/subcategories/:id', deleteSubcategory); // Delete a subcategory

export default router;
