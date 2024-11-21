import Inventory from '../models/inventoryModel.js';

// List all inventory items
export const listInventoryItems = async (req, res) => {
    try {
        const inventoryItems = await Inventory.find({}, 'itemID itemDescription currentStockLevel');
        res.json(inventoryItems);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Failed to fetch inventory items' });
    }
};

// Get inventory item by ID
export const getInventoryItem = async (req, res) => {
    try {
        const inventoryItem = await Inventory.findById(req.params.id);
        if (!inventoryItem) return res.status(404).json({ error: 'Item not found' });
        res.json(inventoryItem);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Failed to fetch item' });
    }
};

// Add inventory item
export const addInventoryItem = async (req, res) => {
    try {
        const inventoryItem = new Inventory(req.body);
        await inventoryItem.save();
        res.status(201).json({ message: 'Item added successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Failed to add item' });
    }
};

// Edit inventory item
export const editInventoryItem = async (req, res) => {
    try {
        const inventoryItem = await Inventory.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!inventoryItem) return res.status(404).json({ error: 'Item not found' });
        res.json({ message: 'Item updated successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Failed to update item' });
    }
};

// Delete inventory items
export const deleteInventoryItems = async (req, res) => {
    try {
        const { ids } = req.body;
        await Inventory.deleteMany({ _id: { $in: ids } });
        res.json({ message: 'Items deleted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Failed to delete items' });
    }
};
