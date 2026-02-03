const mongoose = require("mongoose");
const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
    items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "products",
            },
            quantity: {
                type: Number,
                default: 1,
            },
        },
    ],
},{timestamps:true})

module.exports = mongoose.models.carts || mongoose.model("carts", cartSchema);