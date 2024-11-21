import mongoose from 'mongoose';

const inventorySchema = new mongoose.Schema(
    {
        // Identification
        itemID: { type: String, required: true, unique: true },
        itemDescription: { type: String, required: true },

        // Stock Details
        currentStockLevel: { type: Number, required: true, default: 0 },
        onOrder: { type: Number, required: true, default: 0 },

        // Categorization
        category: { type: String, required: true },
        subcategory: { type: String },

        // Supplier Details
        supplierID: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier' },
        supplierName: { type: String },

        // Pricing
        purchasePrice: { type: Number, required: true },
        sellingPrice: { type: Number, required: true },
        markUpValue: { type: Number, default: 0 },
        customMarkup: { type: Boolean, default: false }, // Added custom markup

        // Location and Storage
        location: { type: String },
        storageDetail: { type: String },

        // Tracking and History
        stockAddedDate: { type: Date, default: Date.now },
        lastUpdatedDate: { type: Date, default: Date.now },
        totalSold: { type: Number, default: 0 },
        totalReceived: { type: Number, default: 0 },

        // Barcode and QR Code
        barcodeType: { type: String },
        qrCodeURL: { type: String },

        // Audit and Notifications
        reorderPoint: { type: Number, default: 0 },
        minStock: { type: Number, default: 0 },
        isActive: { type: Boolean, default: true },

        // User and App Integration
        addedByUserID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        lastModifiedByUserID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

        // Optional Fields
        imageURL: { type: String },
        notes: { type: String },
    },
    { timestamps: true }
);

const Inventory = mongoose.model('Inventory', inventorySchema);

export default Inventory;
