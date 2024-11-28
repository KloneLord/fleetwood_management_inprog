import mongoose from 'mongoose';
const { Schema } = mongoose;

const customerSchema = new Schema(
    {
            fleetwood_id: { type: String, required: true, unique: true },
            lic_number: { type: String, required: true },
            customerName: { type: String, required: true },
            contactName: { type: String },
            phoneNumber: { type: String },
            mobileNumber: { type: String },
            emailAddress: { type: String },
            street: { type: String },
            city: { type: String },
            postalCode: { type: String },
            region: { type: String },
            jobSites: { type: [String], default: [] },
            added_by: { type: String, required: true },
            active: { type: Boolean, default: true },
    },
    { timestamps: true }
);

export default mongoose.model('Customer', customerSchema);
