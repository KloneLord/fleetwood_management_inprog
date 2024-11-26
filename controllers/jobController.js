import Job from '../models/jobModel.js';

export const createJob = async (req, res) => {
    try {
        const {
            jobTitle,
            customerId,
            customerName,
            jobSiteId,
            jobSiteName,
            jobSiteAddress,
            jobType,
            jobPriority,
            jobStatus,
            jobDescription,
        } = req.body;

        // Create a new job document
        const newJob = new Job({
            jobTitle,
            customerId,
            customerName, // Save customer name
            jobSiteId,
            jobSiteName, // Save job site name
            jobSiteAddress, // Save job site address
            jobType,
            jobPriority,
            jobStatus,
            jobDescription,
        });

        // Save the job to the database
        const savedJob = await newJob.save();

        res.status(201).json({ message: 'Job created successfully', job: savedJob });
    } catch (error) {
        console.error('Error creating job:', error);
        res.status(500).json({ error: 'Failed to create job' });
    }
};


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


