import express from 'express';
import {
    listCategories,
    addCategory,
    deleteCategory,
    addSubcategory,
    deleteSubcategory
} from '../../controllers/categoryController.js';

const router = express.Router();

// Fetch all categories
router.get('/', listCategories);

// Add a new category
router.post('/', addCategory);

// Delete a category
router.delete('/:id', deleteCategory);

// Add a new subcategory
router.post('/subcategories', (req, res, next) => {
    console.log('POST /api/categories/subcategories route accessed');
    next(); // Log the route access and proceed to the controller
}, addSubcategory);

// Delete a subcategory
router.delete('/subcategories/:id', (req, res, next) => {
    console.log('DELETE /api/categories/subcategories/:id accessed with ID:', req.params.id);
    next(); // Log the route access and proceed to the controller
}, deleteSubcategory);

export default router;
