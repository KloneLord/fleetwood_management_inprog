import Customer from '../models/customerModel.js';

export const getCustomers = async (req, res) => {
    try {
        const { active, search } = req.query;
        const query = {
            active: active === 'true',
            $or: [
                { customerName: { $regex: search || '', $options: 'i' } },
                { phoneNumber: { $regex: search || '', $options: 'i' } },
                { emailAddress: { $regex: search || '', $options: 'i' } },
            ],
        };
        const customers = await Customer.find(query).select('fleetwood_id customerName phoneNumber emailAddress active');
        res.json(customers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const deleteCustomers = async (req, res) => {
    try {
        const { fleetwood_ids } = req.body;
        await Customer.deleteMany({ fleetwood_id: { $in: fleetwood_ids } });
        res.json({ message: 'Customers deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const archiveCustomers = async (req, res) => {
    try {
        const { fleetwood_ids } = req.body;
        await Customer.updateMany({ fleetwood_id: { $in: fleetwood_ids } }, { active: false });
        res.json({ message: 'Customers archived successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const reinstateCustomers = async (req, res) => {
    try {
        const { fleetwood_ids } = req.body;
        await Customer.updateMany({ fleetwood_id: { $in: fleetwood_ids } }, { active: true });
        res.json({ message: 'Customers reinstated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getCustomerById = async (req, res) => {
    try {
        const { fleetwood_id } = req.params;
        const customer = await Customer.findOne({ fleetwood_id });
        if (!customer) {
            return res.status(404).json({ error: 'Customer not found' });
        }
        res.json(customer);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const updateCustomer = async (req, res) => {
    try {
        const { fleetwood_id } = req.params;
        const updatedData = req.body;
        const customer = await Customer.findOneAndUpdate({ fleetwood_id }, updatedData, { new: true });
        if (!customer) {
            return res.status(404).json({ error: 'Customer not found' });
        }
        res.json({ message: 'Customer updated successfully', customer });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
