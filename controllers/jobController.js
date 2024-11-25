const Customer = require('../models/customerModel');
const Job = require('../models/jobModel');

// Get customers and their job sites
const getCustomersWithJobSites = async (req, res) => {
    try {
        const customers = await Customer.find({}, 'customerName jobSites'); // Fetch customers with job sites only
        const customersWithSites = customers.map(customer => ({
            customerId: customer._id,
            customerName: customer.customerName,
            jobSites: customer.jobSites.map(site => ({
                siteId: site._id,
                siteDisplayName: `${site.jobsiteName} - ${site.jobsiteAddress}`
            }))
        }));
        res.json(customersWithSites);
    } catch (error) {
        console.error('Error fetching customers and job sites:', error);
        res.status(500).json({ message: 'Error fetching customers and job sites' });
    }
};

// Create a new job
const createJob = async (req, res) => {
    const { jobTitle, customerId, jobSiteId, jobType, jobPriority, jobStatus, jobDescription } = req.body;

    if (!jobTitle || !customerId || !jobSiteId || !jobDescription) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const newJob = new Job({
            jobTitle,
            customerId,
            jobSiteId,
            jobType: jobType || 'Other',
            jobPriority: jobPriority || 'Normal',
            jobStatus: jobStatus || 'Registered',
            jobDescription
        });

        await newJob.save();
        res.status(201).json({ message: 'Job created successfully', job: newJob });
    } catch (error) {
        console.error('Error creating job:', error);
        res.status(500).json({ message: 'Error creating job' });
    }
};

module.exports = { getCustomersWithJobSites, createJob };
