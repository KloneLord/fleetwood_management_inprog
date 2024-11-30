import express from 'express';
import {
    getCategories,
    saveCategory,
    deleteCategory,
<<<<<<< HEAD
    addSubcategory,
    deleteSubcategory,
=======
>>>>>>> de7a00b (dont do it)
} from '../../controllers/categoryController.js';

const router = express.Router();

// Get categories and subcategories
router.get('/', getCategories);

// Save a category and subcategory
router.post('/', saveCategory);

<<<<<<< HEAD
// Delete a category
router.delete('/:id', deleteCategory);

// Add a new subcategory
router.post('/subcategories', addSubcategory);

// Delete a subcategory
router.delete('/subcategories/:id', deleteSubcategory);
=======
// Delete a category row
router.delete('/:fleetwood_id', deleteCategory);
>>>>>>> de7a00b (dont do it)

export default router;
