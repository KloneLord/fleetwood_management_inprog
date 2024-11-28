import Customer from '../models/customerModel.js';
import { generateUniqueId } from './id_genController.js';
import { createObjectCsvStringifier } from 'csv-writer';

// List all customers
export const listCustomers = async (req, res) => {
    try {
        const { archived } = req.query;
        const filter = archived === "true" ? { active: false } : { active: true };
        const customers = await Customer.find(filter);
        res.json(customers);
    } catch (err) {
        console.error("Error listing customers:", err.message);
        res.status(500).json({ error: "Failed to fetch customers" });
    }
};

// Get customer by ID
export const getCustomer = async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        if (!customer) return res.status(404).json({ error: 'Customer not found' });
        res.json(customer);
    } catch (err) {
        console.error('Error fetching customer:', err.message);
        res.status(500).json({ error: 'Failed to fetch customer' });
    }
};

// Add customer
export const addCustomer = async (req, res) => {
    try {
        const fleetwoodId = await generateUniqueId('cust-');
        const addedBy = req.session?.user?.username || req.headers['added-by'] || 'Unknown';
        const licNumber = req.session?.user?.lic_no || req.headers['lic-number'];

        if (!licNumber) {
            return res.status(400).json({ error: 'License number is required' });
        }

        const formattedJobSites = (req.body.jobSites || []).map(
            (site) => `${site.siteName} - ${site.siteAddress}`
        );

        const customerData = {
            _id: fleetwoodId,
            fleetwood_id: fleetwoodId,
            added_by: addedBy,
            lic_number: licNumber,
            customerName: req.body.customerName,
            contactName: req.body.contactName || '',
            phoneNumber: req.body.phoneNumber || '',
            mobileNumber: req.body.mobileNumber || '',
            emailAddress: req.body.emailAddress || '',
            street: req.body.street || '',
            city: req.body.city || '',
            postalCode: req.body.postalCode || '',
            region: req.body.region || '',
            jobSites: formattedJobSites,
            active: true,
        };

        const customer = new Customer(customerData);
        await customer.save();

        res.status(201).json({ message: 'Customer added successfully', customer });
    } catch (err) {
        console.error('Error adding customer:', err.message);
        res.status(500).json({ error: 'Failed to add customer' });
    }
};

// Edit customer
export const editCustomer = async (req, res) => {
    try {
        const formattedJobSites = (req.body.jobSites || []).map(
            (site) => `${site.siteName} - ${site.siteAddress}`
        );

        const updateData = {
            ...req.body,
            jobSites: formattedJobSites,
        };

        const customer = await Customer.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!customer) return res.status(404).json({ error: 'Customer not found' });
        res.json({ message: 'Customer updated successfully', customer });
    } catch (err) {
        console.error('Error editing customer:', err.message);
        res.status(500).json({ error: 'Failed to update customer' });
    }
};

// Delete customers
export const deleteCustomers = async (req, res) => {
    try {
        const { ids } = req.body;
        if (!ids || !ids.length) {
            return res.status(400).json({ error: 'No customer IDs provided for deletion' });
        }

        await Customer.deleteMany({ _id: { $in: ids } });
        res.json({ message: 'Customers deleted successfully' });
    } catch (err) {
        console.error('Error deleting customers:', err.message);
        res.status(500).json({ error: 'Failed to delete customers' });
    }
};

// Archive customers
export const archiveCustomers = async (req, res) => {
    try {
        const { ids, active } = req.body;
        if (!ids || !ids.length) {
            return res.status(400).json({ error: 'No customer IDs provided for update' });
        }

        await Customer.updateMany({ _id: { $in: ids } }, { active });
        res.json({ message: `Customers ${active ? 'reinstated' : 'archived'} successfully.` });
    } catch (err) {
        console.error('Error archiving customers:', err.message);
        res.status(500).json({ error: 'Failed to archive/reinstate customers' });
    }
};

// Export customers as CSV
export const exportCustomers = async (req, res) => {
    try {
        const customers = await Customer.find();

        if (!customers || customers.length === 0) {
            return res.status(404).json({ error: "No customers found to export." });
        }

        const csvStringifier = createObjectCsvStringifier({
            header: [
                { id: "fleetwood_id", title: "FleetwoodID" },
                { id: "lic_number", title: "LicenseNumber" },
                { id: "customerName", title: "Name" },
                { id: "contactName", title: "ContactName" },
                { id: "phoneNumber", title: "PhoneNumber" },
                { id: "mobileNumber", title: "MobileNumber" },
                { id: "emailAddress", title: "EmailAddress" },
                { id: "street", title: "Street" },
                { id: "city", title: "City" },
                { id: "postalCode", title: "PostalCode" },
                { id: "region", title: "Region" },
                { id: "jobSites", title: "JobSites" },
                { id: "added_by", title: "AddedBy" },
                { id: "active", title: "Active" },
                { id: "createdAt", title: "CreatedAt" },
                { id: "updatedAt", title: "UpdatedAt" },
            ],
        });

        const csvData = customers.map((customer) => ({
            fleetwood_id: customer.fleetwood_id || "N/A",
            lic_number: customer.lic_number || "N/A",
            customerName: customer.customerName || "N/A",
            contactName: customer.contactName || "N/A",
            phoneNumber: customer.phoneNumber || "N/A",
            mobileNumber: customer.mobileNumber || "N/A",
            emailAddress: customer.emailAddress || "N/A",
            street: customer.street || "N/A",
            city: customer.city || "N/A",
            postalCode: customer.postalCode || "N/A",
            region: customer.region || "N/A",
            jobSites: Array.isArray(customer.jobSites) ? customer.jobSites.join("; ") : "N/A",
            added_by: customer.added_by || "N/A",
            active: customer.active ? "Yes" : "No",
            createdAt: customer.createdAt ? customer.createdAt.toISOString() : "N/A",
            updatedAt: customer.updatedAt ? customer.updatedAt.toISOString() : "N/A",
        }));

        const csvString = csvStringifier.getHeaderString() + csvStringifier.stringifyRecords(csvData);

        res.setHeader("Content-Disposition", "attachment; filename=customers.csv");
        res.setHeader("Content-Type", "text/csv");
        res.status(200).send(csvString);
    } catch (error) {
        console.error("Error exporting customers:", error);
        res.status(500).json({ error: "Failed to export customers." });
    }
};


export const importCustomers = async (req, res) => {
    try {
        const { customers } = req.body;

        console.log("Received customers for import:", customers); // Log received data

        if (!customers || !Array.isArray(customers)) {
            console.error("Invalid customers data format:", req.body);
            return res.status(400).json({ error: "Invalid customers data format." });
        }

        const errors = [];
        const savedCustomers = [];

        for (const [index, customer] of customers.entries()) {
            try {
                console.log(`Processing customer #${index + 1}:`, customer);

                // Validate or assign default values for required fields
                if (!customer.customerName) throw new Error("customerName is required");
                if (!customer.lic_number) throw new Error("lic_number is required");
                if (!customer.added_by) throw new Error("added_by is required");

                const fleetwoodId = customer.fleetwood_id || (await generateUniqueId("cust-"));
                console.log(`Generated/Existing Fleetwood ID: ${fleetwoodId}`);

                const jobSites = Array.isArray(customer.jobSites)
                    ? customer.jobSites
                    : customer.jobSites?.split(";") || [];
                console.log(`Parsed jobSites for customer #${index + 1}:`, jobSites);

                // Convert "TRUE"/"FALSE" strings to Booleans
                const activeStatus =
                    typeof customer.active === "string"
                        ? customer.active.toUpperCase() === "TRUE"
                        : Boolean(customer.active);

                console.log(`Converted active status for customer #${index + 1}:`, activeStatus);

                const customerData = {
                    fleetwood_id: fleetwoodId,
                    lic_number: customer.lic_number || "N/A",
                    customerName: customer.customerName || "N/A",
                    contactName: customer.contactName || "N/A",
                    phoneNumber: customer.phoneNumber || "N/A",
                    mobileNumber: customer.mobileNumber || "N/A",
                    emailAddress: customer.emailAddress || "N/A",
                    street: customer.street || "N/A",
                    city: customer.city || "N/A",
                    postalCode: customer.postalCode || "N/A",
                    region: customer.region || "N/A",
                    jobSites,
                    added_by: customer.added_by || "System",
                    active: activeStatus, // Use the converted active status
                };

                console.log(`Customer data prepared for database:`, customerData);

                const savedCustomer = await Customer.findOneAndUpdate(
                    { fleetwood_id: fleetwoodId },
                    customerData,
                    { upsert: true, new: true }
                );

                console.log(`Customer saved/updated successfully:`, savedCustomer);
                savedCustomers.push(savedCustomer);
            } catch (err) {
                console.error(`Error processing customer #${index + 1}:`, err.message);
                errors.push({ customer, error: err.message });
            }
        }

        if (errors.length) {
            console.error("Some customers failed to import:", errors);
        } else {
            console.log("All customers imported successfully.");
        }

        res.status(200).json({
            message: "Customers processed",
            savedCustomers,
            failedCustomers: errors,
        });
    } catch (error) {
        console.error("Critical error during import process:", error.message);
        res.status(500).json({ error: "Failed to import customers." });
    }
};
