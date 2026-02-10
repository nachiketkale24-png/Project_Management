import mongoose, { Schema } from 'mongoose';
import { AvailableBloodTypes } from '../utils/constants.js';

const bloodInventorySchema = new Schema(
    {
        bloodType: {
            type: String,
            required: [true, 'Blood type is required'],
            enum: AvailableBloodTypes
        },
        units: {
            type: Number,
            required: [true, 'Number of units is required'],
            min: [0, 'Units cannot be negative']
        },
        collectionDate: {
            type: Date,
            required: [true, 'Collection date is required']
        },
        expiryDate: {
            type: Date,
            required: [true, 'Expiry date is required']
        },
        donor: {
            type: Schema.Types.ObjectId,
            ref: 'BloodDonor'
        },
        status: {
            type: String,
            enum: ['available', 'reserved', 'used', 'expired'],
            default: 'available'
        },
        location: {
            type: String,
            trim: true
        },
        notes: {
            type: String,
            trim: true
        },
        addedBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    { timestamps: true }
);

// Index for efficient blood type queries
bloodInventorySchema.index({ bloodType: 1, status: 1 });

const BloodInventory = mongoose.model('BloodInventory', bloodInventorySchema);

export default BloodInventory;
