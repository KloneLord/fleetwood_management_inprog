import mongoose from 'mongoose';

const SubcategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
});

const CategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    subcategories: [SubcategorySchema],
});

export default mongoose.model('Category', CategorySchema);
