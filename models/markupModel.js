import mongoose from 'mongoose';

const markUpSchema = new mongoose.Schema({
    title: { type: String, required: true },
    modifier: { type: Number, required: true },
    fleetwood_id: { type: String, required: true, unique: true },
    licenseNumber: { type: String, required: true },
});

const MarkUp = mongoose.model('MarkUp', markUpSchema);
export default MarkUp;
