import mongoose from 'mongoose';

const { Schema } = mongoose;

const jobSchema = new Schema(
    {
            jobTitle: { type: String, required: true },
            customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
            customerName: { type: String }, // New field for customer name
            jobSiteId: { type: mongoose.Schema.Types.ObjectId, ref: 'JobSite', required: true },
            jobSiteName: { type: String }, // New field for job site name
            jobSiteAddress: { type: String }, // New field for job site address
            jobType: { type: String, enum: ['Repair', 'Maintenance', 'Project', 'Other'], default: 'Other' },
            jobPriority: { type: String, enum: ['Normal', 'High', 'Urgent'], default: 'Normal' },
            jobStatus: { type: String, enum: ['Registered', 'In Progress', 'Cancelled', 'To Invoice', 'Complete'], default: 'Registered' },
            jobDescription: { type: String },
            active: { type: Boolean, default: true }, // Add active field with default value true
    },
    { timestamps: true } // Automatically manage createdAt and updatedAt fields
);

const Job = mongoose.model('Job', jobSchema);
export default Job;
