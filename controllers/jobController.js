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

<<<<<<< HEAD

export const getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find(); // Fetch all jobs
        res.status(200).json(jobs);
    } catch (error) {
        console.error('Error fetching jobs:', error);
        res.status(500).json({ error: 'Failed to fetch jobs' });
    }
};

// Controller to get jobs (supports filtering by active status)
export const getJobs = async (req, res) => {
    try {
        const { active } = req.query; // Retrieve the active filter from query params

        // Create a query object
        const query = {};
        if (active) {
            query.active = active === 'true'; // Ensure the filter is boolean
        }

        const jobs = await Job.find(query);
        res.status(200).json(jobs);
    } catch (error) {
        console.error('Error fetching jobs:', error);
        res.status(500).json({ error: 'Failed to fetch jobs' });
    }
};

// Controller to update a job's active status
export const updateJob = async (req, res) => {
    try {
        const { id } = req.params;
        const { active } = req.body;

        // Update the job's active status
        const updatedJob = await Job.findByIdAndUpdate(
            id,
            { active },
            { new: true } // Return the updated document
        );

        if (!updatedJob) {
            return res.status(404).json({ error: 'Job not found' });
        }

        res.status(200).json({ message: 'Job updated successfully', job: updatedJob });
    } catch (error) {
        console.error('Error updating job:', error);
        res.status(500).json({ error: 'Failed to update job' });
    }
};


export const getJobById = async (req, res) => {
    try {
        const { id } = req.params;
        const job = await Job.findById(id);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }
        res.status(200).json(job);
    } catch (error) {
        console.error('Error fetching job by ID:', error);
        res.status(500).json({ message: 'Failed to fetch job' });
    }
};

// Store job ID in session
export const setJobInSession = (req, res) => {
    const { jobId } = req.body;
    if (!jobId) {
        return res.status(400).json({ message: 'Job ID is required' });
    }
    req.session.jobId = jobId;
    res.status(200).json({ message: 'Job ID stored in session successfully' });
};

// Retrieve job ID from session
export const getJobFromSession = (req, res) => {
    if (!req.session.jobId) {
        return res.status(404).json({ message: 'No job ID found in session' });
    }
    res.status(200).json({ jobId: req.session.jobId });
};



=======
module.exports = { getCustomersWithJobSites, createJob };
>>>>>>> parent of f0ef46e (update to job card)
