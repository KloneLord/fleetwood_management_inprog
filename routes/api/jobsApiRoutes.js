import express from 'express';
import {archiveJob, createJob, getJobs, getJobById } from '../../controllers/jobController.js';

const router = express.Router();

router.post('/', createJob);

router.get('/', getJobs);

router.get('/:id', getJobById); // Add route for fetching a job by ID

router.post('/archive/:id', archiveJob);

export default router;