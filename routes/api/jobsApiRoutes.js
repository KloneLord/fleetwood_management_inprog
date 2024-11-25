const express = require('express');
const router = express.Router();
const { getCustomersWithJobSites, createJob } = require('../../controllers/jobController');

// Route to get customers and their job sites
router.get('/customers-with-job-sites', getCustomersWithJobSites);

// Route to create a new job
router.post('/', createJob);

module.exports = router;
