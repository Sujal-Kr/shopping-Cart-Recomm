const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
        enum: ["Electronics", "Clothing", "Books", "Home & Kitchen", "Sports", "Beauty & Personal Care", "Toys", "Furniture", "Others"],
    },
    brand: String,
    tags: [String],

    rating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
    
    inStock: { type: Boolean, default: true },
    priceRange: { type: String },

    views: { type: Number, default: 0 },
    clicks: { type: Number, default: 0 },
    purchases: { type: Number, default: 0 },

    embedding: [Number]

}, { timestamps: true });

module.exports = mongoose.model("products", productSchema);