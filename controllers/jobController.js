import Job from '../models/jobModel.js';

export const createJob = async (req, res) => {
    try {
        const {
            jobTitle,
            customer,
            siteName,
            siteAddress,
            jobType,
            jobPriority,
            jobStatus,
            jobDescription,
        } = req.body;

        const newJob = new Job({
            jobTitle,
            customer,
            siteName,
            siteAddress,
            jobType,
            jobPriority,
            jobStatus,
            jobDescription,
        });

        await newJob.save();
        res.status(201).json({ message: 'Job created successfully', job: newJob });
    } catch (error) {
        console.error('Error creating job:', error);
        res.status(500).json({ message: 'Failed to create job', error });
    }
};



// Controller to fetch jobs
export const getJobs = async (req, res) => {
    try {
        // Fetch jobs from the database, and optionally populate customer names
        const jobs = await Job.find()
            .populate('customer', 'customerName') // Populates customerName if customer is an ObjectId
            .sort({ createdAt: -1 }); // Sorts jobs by creation date (newest first)

        // Log the fetched jobs for debugging
        console.log('Fetched jobs:', jobs);

        // Send the jobs as a response
        res.status(200).json(jobs);
    } catch (error) {
        console.error('Error fetching jobs:', error);
        res.status(500).json({ message: 'Failed to fetch jobs', error });
    }
};


export const archiveJob = async (req, res) => {
    try {
        const jobId = req.params.id;
        await Job.findByIdAndUpdate(jobId, { jobStatus: 'Archived' }); // Example: Mark job as archived
        res.status(200).json({ message: 'Job archived successfully' });
    } catch (error) {
        console.error('Error archiving job:', error);
        res.status(500).json({ message: 'Failed to archive job', error });
    }
};

const fetchJobs = async () => {
    try {
        const response = await axios.get('/api/jobs'); // Replace with your API endpoint
        console.log('API Response:', response.data); // Log the API response for debugging
        if (response.data && Array.isArray(response.data)) {
            return response.data; // Return the array of jobs
        } else {
            console.error('Invalid job data received:', response.data);
            alert('Invalid job data received.');
            return [];
        }
    } catch (error) {
        console.error('Error fetching jobs:', error);
        alert('Failed to load jobs. Please try again.');
        return [];
    }
};


// Get a single job by ID
export const getJobById = async (req, res) => {
    try {

        const { id } = req.params; // Extract the job ID from the request parameters
        const job = await Job.findById(id);

        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        res.status(200).json(job);
    } catch (error) {
        console.error('Error fetching job by ID:', error);
        res.status(500).json({ message: 'Failed to fetch job', error });
    }
};
