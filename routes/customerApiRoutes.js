import express from 'express';
import {
    getCustomers,
    deleteCustomers,
    archiveCustomers,
    reinstateCustomers,
    getCustomerById,
    updateCustomer,
    addCustomer, // Import the function to add a customer
} from '../../controllers/customerController.js';

const router = express.Router();

router.get('/', getCustomers); // Fetch active/inactive customers
router.post('/', addCustomer); // Add a new customer
router.post('/delete', deleteCustomers); // Delete selected customer
router.post('/archive', archiveCustomers); // Archive selected customer
router.post('/reinstate', reinstateCustomers); // Reinstate archived customer
router.get('/:fleetwood_id', getCustomerById); // Get customer details for view/edit
router.put('/:fleetwood_id', updateCustomer); // Update customer details

export default router;
