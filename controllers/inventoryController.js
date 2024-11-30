import Inventory from '../models/inventoryModel.js';
import { generateUniqueId } from './id_genController.js';

// List all inventory items
export const listInventories = async (req, res) => {
    try {
        const inventories = await Inventory.find();
        res.status(200).json(inventories);
    } catch (error) {
        console.error('Error listing inventories:', error);
        res.status(500).json({ message: 'Failed to list inventories.' });
    }
};

// Get inventory by ID
export const getInventory = async (req, res) => {
    try {
        const inventory = await Inventory.findById(req.params.id);
        if (!inventory) {
            return res.status(404).json({ message: 'Inventory item not found.' });
        }
        res.status(200).json(inventory);
    } catch (error) {
        console.error('Error fetching inventory:', error);
        res.status(500).json({ message: 'Failed to fetch inventory.', error: error.message });
    }
};

// Add a new inventory item
export const addInventoryItem = async (req, res) => {
    try {
        const lic_no = req.session.lic_no; // License number from session
        if (!lic_no) {
            return res.status(400).json({ message: 'License number missing in session.' });
        }

        const fleetwood_id = await generateUniqueId('ite-');
        const licenseNumber = req.session.lic_no;
        const inventoryData = {
            ...req.body,
            fleetwood_id,
            licenseNumber: lic_no, // Assign license number
        };
        console.log(fleetwood_id - licenseNumber)
        const newInventory = new Inventory(inventoryData);
        await newInventory.save();
        res.status(201).json({ message: 'Inventory item added successfully.', inventory: newInventory });
    } catch (error) {
        console.error('Error adding inventory:', error);
        res.status(500).json({ message: 'Failed to add inventory.', error: error.message });
    }
};

// Edit inventory by ID
export const editInventory = async (req, res) => {
    try {
        const updatedInventory = await Inventory.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedInventory) {
            return res.status(404).json({ message: 'Inventory item not found.' });
        }
        res.status(200).json({ message: 'Inventory item updated successfully.', inventory: updatedInventory });
    } catch (error) {
        console.error('Error updating inventory:', error);
        res.status(500).json({ message: 'Failed to update inventory.', error: error.message });
    }
};

// Delete inventory by IDs
export const deleteInventories = async (req, res) => {
    try {
        const { ids } = req.body;
        await Inventory.deleteMany({ _id: { $in: ids } });
        res.status(200).json({ message: 'Inventory items deleted successfully.' });
    } catch (error) {
        console.error('Error deleting inventories:', error);
        res.status(500).json({ message: 'Failed to delete inventories.', error: error.message });
    }
};

// Get all inventory items for a specific license
export const getInventoryItems = async (req, res) => {
    try {
        const { lic_no } = req.session; // License number from session
        if (!lic_no) {
            return res.status(400).json({ message: 'License number missing in session.' });
        }

        const inventories = await Inventory.find({ lic_number: lic_no });
        res.status(200).json(inventories);
    } catch (error) {
        console.error('Error fetching inventory items:', error);
        res.status(500).json({ message: 'Failed to fetch inventory items.', error: error.message });
    }
};
