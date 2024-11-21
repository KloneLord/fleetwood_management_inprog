import mongoose from 'mongoose';
const { Schema } = mongoose;

// Define the Job Site Schema
const jobSiteSchema = new Schema({
    siteName: { type: String, required: true },
    siteAddress: { type: String, required: true },
});

// Define Customer Schema
const customerSchema = new Schema(
    {
        customerName: { type: String, required: true }, // Customer or Business name
        contactName: { type: String }, // Primary contact name
        phoneNumber: { type: String }, // Primary contact number
        mobileNumber: { type: String }, // Secondary contact number
        emailAddress: { type: String }, // Email address
        street: { type: String },
        city: { type: String },
        postalCode: { type: String },
        region: { type: String },
        jobSites: [jobSiteSchema], // Array of job sites as subdocuments
    },
    { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Export the Customer model
const Customer = mongoose.model('Customer', customerSchema);
export default Customer;
