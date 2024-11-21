import Customer from '../models/customerModel.js';

// List all customers
export const listCustomers = async (req, res) => {
    try {
        const customers = await Customer.find({}, 'customerName emailAddress phoneNumber');
        res.json(customers);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Failed to fetch customers' });
    }
};

// Get customer by ID
export const getCustomer = async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        if (!customer) return res.status(404).json({ error: 'Customer not found' });
        res.json(customer);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Failed to fetch customer' });
    }
};

// Add customer
export const addCustomer = async (req, res) => {
    try {
        const customer = new Customer(req.body);
        await customer.save();
        res.status(201).json({ message: 'Customer added successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Failed to add customer' });
    }
};

// Edit customer
export const editCustomer = async (req, res) => {
    try {
        const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!customer) return res.status(404).json({ error: 'Customer not found' });
        res.json({ message: 'Customer updated successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Failed to update customer' });
    }
};

// Delete customers
export const deleteCustomers = async (req, res) => {
    try {
        const { ids } = req.body;
        await Customer.deleteMany({ _id: { $in: ids } });
        res.json({ message: 'Customers deleted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Failed to delete customers' });
    }
};
