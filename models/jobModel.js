import mongoose from 'mongoose';
const { Schema } = mongoose;

const jobSchema = new Schema(
    {
        jobTitle: { type: String, required: true },
        customer: { type: String, required: true }, // Storing customer name directly
        siteName: { type: String, required: true }, // Independent string for site name
        siteAddress: { type: String, required: true }, // Independent string for site address
        jobType: { type: String, enum: ['Repair', 'Maintenance', 'Project', 'Other'], required: true },
        jobPriority: { type: String, enum: ['Normal', 'High', 'Urgent'], default: 'Normal' },
        _id: { type: String }, // Use a string instead of ObjectId
        jobStatus: {
            type: String,
            enum: ['Registered', 'In Progress', 'Cancelled', 'To Invoice', 'Complete'],
            default: 'Registered',
        },
        jobDescription: { type: String },
    },
    { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

const Job = mongoose.model('Job', jobSchema);
export default Job;
