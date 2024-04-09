import mongoose from "mongoose";

const { Schema } = mongoose;

const portfolioItemSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, // Reference to User
        ref: 'User',
        required: true,
    },
    itemType: {
        type: String, // Could be "image", "film", or "project"
        required: true,
    },
    folderName: {
        type: String,
        required: true,
    },
    name: {
        type: [String], // Names or titles of items
        default: [],
    },
    paths: {
        type: [String], // URLs to images or films
        default: [],
    },
}, {
    timestamps: true,
});

export const PortfolioItemModel = mongoose.model("PortfolioItem", portfolioItemSchema);
