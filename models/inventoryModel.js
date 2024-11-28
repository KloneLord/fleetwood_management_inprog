import mongoose from 'mongoose';
const { Schema } = mongoose;

// Inventory Schema
const inventorySchema = new Schema(
    {
            itemID: { type: String, required: true },
            itemDescription: { type: String, required: true },
            category: { type: String, required: true }, // Category reference
            subcategory: { type: String }, // Subcategory reference
            currentStockLevel: { type: Number, default: 0 },
            onOrder: { type: Number, default: 0 },
            supplierName: { type: String },
            purchasePrice: { type: mongoose.Types.Decimal128, required: true },
            markupAmount: { type: mongoose.Types.Decimal128, default: 0 },
            customSellPrice: { type: mongoose.Types.Decimal128, default: 0 },
            finalizedSellPrice: { type: mongoose.Types.Decimal128, default: 0 },
            location: { type: String },
            detailLoc: { type: String },
            barcode: { type: String },
            qrCode: { type: String },
            reorderPoint: { type: Number, default: 0 },
            alertThreshold: { type: Number, default: 0 },
            isActive: { type: Boolean, default: true },
            notes: { type: String },
            totalBought: { type: Number, default: 0 },
            totalSold: { type: Number, default: 0 },
            lastEdited: { type: String }, // Username of the editor
            editTime: { type: Date, default: Date.now }, // Time of edit
            _id: { type: String }, // Use a string instead of ObjectId
    },
    { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Export the Inventory model
const Inventory = mongoose.model('Inventory', inventorySchema);
export default Inventory;
