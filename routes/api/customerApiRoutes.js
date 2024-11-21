import express from 'express';
import {
    addCustomer,
    editCustomer,
    getCustomer,
    listCustomers,
    deleteCustomers,
} from '../../controllers/customerController.js';

const router = express.Router();

router.get('/', listCustomers);
router.get('/:id', getCustomer);
router.post('/', addCustomer);
router.put('/:id', editCustomer);
router.delete('/', deleteCustomers);

export default router;
