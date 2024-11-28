import mongoose from 'mongoose';

const page7Schema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    team: { type: String, required: true },
    username: { type: String, required: true },
    entryDate: { type: Date, default: Date.now },
    _id: { type: String }, // Use a string instead of ObjectId
});

export default mongoose.model('Page7', page7Schema);
