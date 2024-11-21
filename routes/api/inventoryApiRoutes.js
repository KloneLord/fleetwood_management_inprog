import express from 'express';
import {
    listInventoryItems,
    getInventoryItem,
    addInventoryItem,
    editInventoryItem,
    deleteInventoryItems,
} from '../../controllers/inventoryController.js';

const router = express.Router();

router.get('/', listInventoryItems);
router.get('/:id', getInventoryItem);
router.post('/', addInventoryItem);
router.put('/:id', editInventoryItem);
router.delete('/', deleteInventoryItems);

export default router;
