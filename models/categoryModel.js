import mongoose from 'mongoose';

// Define Subcategory Schema
const SubcategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
});

// Define Category Schema
const CategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    subcategories: [SubcategorySchema], // Array of subdocuments
});

// Export Category Model
export default mongoose.model('Category', CategorySchema);
