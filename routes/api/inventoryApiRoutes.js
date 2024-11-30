import express from 'express';
import {
    listInventories,
    getInventory,
    addInventoryItem,
    editInventory,
    deleteInventories,
    getInventoryItems,
} from '../../controllers/inventoryController.js';

const router = express.Router();

// Route to list all inventory items
router.get('/', listInventories);

// Route to get a single inventory item by ID
router.get('/:id', getInventory);

// Route to add a new inventory item
router.post('/', addInventoryItem);

// Route to edit an inventory item by ID
router.put('/:id', editInventory);

// Route to delete multiple inventory items
router.delete('/', deleteInventories);

// Route to get inventory items for a specific license
router.get('/license/items', getInventoryItems);

export default router;
