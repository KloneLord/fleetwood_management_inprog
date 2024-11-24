import express from 'express';
import {
    listInventories,
    getInventory,
    addInventory,
    editInventory,
    deleteInventories,
} from '../../controllers/inventoryController.js';

const router = express.Router();

router.get('/', listInventories); // List all inventories
router.get('/:id', getInventory); // Get inventory by ID
router.post('/', addInventory); // Add a new inventory item
router.put('/:id', editInventory); // Edit inventory by ID
router.delete('/', deleteInventories); // Delete multiple inventory items

export default router;
