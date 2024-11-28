import mongoose from 'mongoose';
const { Schema } = mongoose;

// Define User Schema
const userSchema = new Schema(
    {
        fleetwood_id: { type: String, required: true, unique: true }, // Unique Fleetwood ID (e.g., id-########)
        lic_no: { type: String, required: true }, // License number (e.g., lic-########)
        username: { type: String, required: true, unique: true, trim: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: String, enum: ['worker', 'manager', 'admin'], default: 'worker' },
        phoneNumber: { type: String, default: '' },
        street: { type: String, default: '' },
        city: { type: String, default: '' },
        state: { type: String, default: '' },
        postcode: { type: String, default: '' },
        country: { type: String, default: '' },
        accreditationTitles: { type: [String], default: [] },
        accreditationPictures: { type: [String], default: [] },
        accreditationCompletionDates: { type: [Date], default: [] },
        accreditationExpiryDates: { type: [Date], default: [] },
        hoursWorkedThisWeek: { type: Number, default: 0 },
        hoursWorkedThisMonth: { type: Number, default: 0 },
        hoursWorkedThisYear: { type: Number, default: 0 },
        hoursWorkedTotal: { type: Number, default: 0 },
        hoursBillThisWeek: { type: Number, default: 0 },
        hoursBillThisMonth: { type: Number, default: 0 },
        hoursBillThisYear: { type: Number, default: 0 },
        hoursBillTotal: { type: Number, default: 0 },
        skills: { type: [String], default: [] },
    },
    { timestamps: true } // Automatically adds createdAt and updatedAt
);

// Export User model
export default mongoose.model('User', userSchema);
