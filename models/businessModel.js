import mongoose from 'mongoose';
const { Schema } = mongoose;

const businessSchema = new Schema({
    licenseNumber: { type: String, required: true, unique: true },
    accountHolder: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    defaultUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to admin user
    businessName: { type: String, required: true },
    abn: { type: String },
    address: { type: String },
    businessPhone: { type: String },
    businessEmail: { type: String },
});

export default mongoose.model('Business', businessSchema);
