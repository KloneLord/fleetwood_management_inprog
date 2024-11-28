import express from 'express';
import {
    listCustomers,
    getCustomer,
    addCustomer,
    editCustomer,
    deleteCustomers,
    archiveCustomers, // Ensure proper export and use
    importCustomers,
    exportCustomers,
} from '../../controllers/customerController.js';

const router = express.Router();

router.get('/', listCustomers); // List customers
router.get('/export', exportCustomers); // Export customers
router.get('/:id', getCustomer); // Get single customer by ID
router.post('/', addCustomer); // Add a new customer
router.put('/:id', editCustomer); // Edit customer
router.delete('/', deleteCustomers); // Delete customers
router.put('/archive', archiveCustomers); // Archive or reinstate customers
router.post('/import', importCustomers); // Import customers

export default router;
