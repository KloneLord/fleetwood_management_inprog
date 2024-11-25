const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    jobTitle: { type: String, required: true },
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    jobSiteId: { type: mongoose.Schema.Types.ObjectId, required: true },
    jobType: { type: String, default: 'Other' },
    jobPriority: { type: String, default: 'Normal' },
    jobStatus: { type: String, default: 'Registered' },
    jobDescription: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Job', jobSchema);
