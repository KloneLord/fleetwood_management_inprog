import express from 'express';
import {
    listMarkups,
    addMarkup,
    updateMarkup,
    deleteMarkup, // Import the delete function
} from '../../controllers/markUpController.js';

const router = express.Router();

// Get all markups
router.get('/', listMarkups);

// Add a new markup
router.post('/', addMarkup);

// Update a markup
router.put('/:id', updateMarkup);

// Delete a markup
router.delete('/:id', deleteMarkup); // Add a delete route

export default router;
