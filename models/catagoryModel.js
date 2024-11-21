import mongoose from 'mongoose';

const page9Schema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    team: { type: String, required: true },
    username: { type: String, required: true },
    entryDate: { type: Date, default: Date.now },
});

export default mongoose.model('Page9', page9Schema);
