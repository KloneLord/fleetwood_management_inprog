import Inventory from '../models/inventoryModel.js';

// List all inventory items
export const listInventories = async (req, res) => {
    try {
        const inventories = await Inventory.find({}, 'itemID itemDescription currentStockLevel onOrder category subcategory isActive');
        res.json(inventories);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Failed to fetch inventories' });
    }
};

// Get inventory by ID
export const getInventory = async (req, res) => {
    try {
        const inventory = await Inventory.findById(req.params.id);
        if (!inventory) return res.status(404).json({ error: 'Inventory item not found' });
        res.json(inventory);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Failed to fetch inventory' });
    }
};


// Edit inventory by ID
export const editInventory = async (req, res) => {
    try {
        const inventory = await Inventory.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!inventory) return res.status(404).json({ error: 'Inventory item not found' });
        res.json({ message: 'Inventory item updated successfully', inventory });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Failed to update inventory item' });
    }
};

// Delete multiple inventory items
export const deleteInventories = async (req, res) => {
    try {
        const { ids } = req.body;
        await Inventory.deleteMany({ _id: { $in: ids } });
        res.json({ message: 'Inventory items deleted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Failed to delete inventory items' });
    }
};

// Add a new inventory item
export const addInventory = async (req, res) => {
    try {
        // Use the request body to create a new inventory item
        const newInventoryData = req.body;

        // Explicitly initialize missing fields to their default values if not present
        if (typeof newInventoryData.totalBought === 'undefined') {
            newInventoryData.totalBought = 0;
        }
        if (typeof newInventoryData.totalSold === 'undefined') {
            newInventoryData.totalSold = 0;
        }

        const inventory = new Inventory(newInventoryData);
        await inventory.save();
        res.status(201).json({ message: 'Inventory item added successfully', inventory });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Failed to add inventory item' });
    }
};
