import express from 'express';
import {
    createJob,
    getAllJobs,
    getJobs,
    updateJob,
    getJobById,
    setJobInSession,
    getJobFromSession,
} from '../../controllers/jobController.js';

const router = express.Router();

// Create a new job
router.post('/', createJob);

// Get all jobs
router.get('/', getJobs);

// Get a single job by ID
router.get('/:id', getJobById);

// Update a job
router.patch('/:id', updateJob);

// Set job ID in session
router.post('/session/set-job', setJobInSession);

// Get job ID from session
router.get('/session/get-job', getJobFromSession);

export default router;
