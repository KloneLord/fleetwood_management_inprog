import mongoose from 'mongoose';

const businessSchema = new mongoose.Schema(
    {
        _id: { type: String }, // Use licenseNumber as the unique identifier
        lic_no: { type: String, required: true }, // License number (e.g., lic-########)
        accountHolder: { type: String, required: true },
        phone: { type: String, required: true },
        email: { type: String, required: true },
        defaultUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        businessName: { type: String, required: true },
        abn: { type: String },
        address: { type: String },
        businessPhone: { type: String },
        businessEmail: { type: String },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model('Business', businessSchema);
