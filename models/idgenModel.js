import mongoose from 'mongoose';

const idGenSchema = new mongoose.Schema(
    {
        generatedId: { type: String, required: true, unique: true },
        purpose: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

export default mongoose.model('IdGen', idGenSchema);
