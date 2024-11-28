import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 3600, // Session expires after 1 hour
        _id: { type: String }, // Use a string instead of ObjectId
    },
});

const Session = mongoose.model('Session', sessionSchema);

export default Session;
