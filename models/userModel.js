import mongoose from 'mongoose';

const accreditationSchema = new mongoose.Schema({
    title: { type: String, required: true },
    picture: { type: String }, // URL or path to picture
    completionDate: { type: Date, required: true },
    expiryDate: { type: Date, required: true },
});

const userSchema = new mongoose.Schema(
    {
        username: { type: String, required: true, unique: true, trim: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: String, enum: ['worker', 'manager', 'admin'], default: 'worker' },
        phoneNumber: { type: String },
        address: {
            street: String,
            city: String,
            state: String,
            postcode: String,
            country: String,
        },
        accreditation: [accreditationSchema],
        hoursWorked: {
            thisWeek: { type: Number, default: 0 },
            thisMonth: { type: Number, default: 0 },
            thisYear: { type: Number, default: 0 },
            total: { type: Number, default: 0 },
        },
        billedHours: {
            thisWeek: { type: Number, default: 0 },
            thisMonth: { type: Number, default: 0 },
            thisYear: { type: Number, default: 0 },
            total: { type: Number, default: 0 },
        },
        skills: { type: [String], default: [] },
    },
    { timestamps: true }
);

export default mongoose.model('User', userSchema);
