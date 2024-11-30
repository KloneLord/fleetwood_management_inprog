import mongoose from 'mongoose';

const subcategorySchema = new mongoose.Schema({
    fleetwood_id: { type: String, unique: true, required: true },
    licenseNumber: { type: String, required: true },
    categoryId: { type: String, required: true }, // Links to the parent category's fleetwood_id
    name: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

const SubcategoryModel = mongoose.model('Subcategory', subcategorySchema);
export default SubcategoryModel;
