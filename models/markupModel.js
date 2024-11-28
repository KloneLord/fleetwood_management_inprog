import mongoose from 'mongoose';

const markUpSchema = new mongoose.Schema({
    title: { type: String, required: true },
    modifier: { type: Number, required: true }, // Modifier as a percentage
    _id: { type: String }, // Use a string instead of ObjectId
});

const MarkUp = mongoose.model('MarkUp', markUpSchema);
export default MarkUp;
