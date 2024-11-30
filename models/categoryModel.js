import mongoose from 'mongoose';

// Define Category Schema
const CategorySchema = new mongoose.Schema({
    fleetwood_id: { type: String, required: true, unique: true }, // Unique ID
    licenseNumber: { type: String, required: true }, // License number for session validation
    name: { type: String, required: true }, // Category name
    subcategories: { type: String, required: true }, // Subcategory name
    usedBy: { type: Number, default: 0 }, // Prevent deletion if usedBy > 0
});

export default mongoose.model('Category', CategorySchema);
