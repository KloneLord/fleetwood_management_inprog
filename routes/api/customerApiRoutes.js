import express from 'express';
import {
    getCustomers,
    deleteCustomers,
    archiveCustomers,
    reinstateCustomers,
    getCustomerById,
    updateCustomer,
} from '../../controllers/customerController.js';

const router = express.Router();

router.get('/', getCustomers); // Fetch active/inactive customers
router.post('/delete', deleteCustomers); // Delete selected customers
router.post('/archive', archiveCustomers); // Archive selected customers
router.post('/reinstate', reinstateCustomers); // Reinstate archived customers
router.get('/:fleetwood_id', getCustomerById); // Get customer details for view/edit
router.put('/:fleetwood_id', updateCustomer); // Update customer details

export default router;
