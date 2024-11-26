import express from 'express';
import { createJob } from '../../controllers/jobController.js';
import { getAllJobs } from '../../controllers/jobController.js';
import { getJobs, updateJob } from '../../controllers/jobController.js';
import { getJobById } from '../../controllers/jobController.js';

const router = express.Router();

// Route to handle job creation
router.post('/', createJob);
router.get('/', getAllJobs);
router.get('/', getJobs);
router.patch('/:id', updateJob);
router.get('/:id', getJobById);

export default router;





