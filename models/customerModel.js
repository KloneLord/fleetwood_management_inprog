import mongoose from 'mongoose';
const { Schema } = mongoose;

// Define Customer Schema
const customerSchema = new Schema(
    {
        fleetwood_id: { type: String, required: true, unique: true }, // Unique Fleetwood ID
        lic_number: { type: String, required: true }, // License number associated with the customer
        customerName: { type: String, required: true }, // Customer or Business name
        contactName: { type: String }, // Primary contact name
        phoneNumber: { type: String }, // Primary contact number
        mobileNumber: { type: String }, // Secondary contact number
        emailAddress: { type: String }, // Email address
        street: { type: String },
        city: { type: String },
        postalCode: { type: String },
        region: { type: String },
        jobSites: { type: [String], default: [] }, // Array of strings for "name - address"
        _id: { type: String }, // Use a string instead of ObjectId
        added_by: { type: String, required: true }, // User who added the customer
        active: { type: Boolean, default: true }, // Active status, default to true
    },
    { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Export the Customer model
const Customer = mongoose.model('Customer', customerSchema);
export default Customer;
