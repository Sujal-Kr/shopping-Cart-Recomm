const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        items: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true,
                },
                name: {
                    type: String,
                    required: true,
                },
                price: {
                    type: Number,
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                    min: 1,
                },
                image: String,
            },
        ],
        shippingAddress: {
            fullName: {
                type: String,
                required: true,
            },
            phone: {
                type: String,
                required: true,
            },
            addressLine1: {
                type: String,
                required: true,
            },
            addressLine2: String,
            city: {
                type: String,
                required: true,
            },
            state: {
                type: String,
                required: true,
            },
            pincode: {
                type: String,
                required: true,
            },
            country: {
                type: String,
                default: "India",
            },
        },
        paymentDetails: {
            razorpayOrderId: {
                type: String,
                required: true,
            },
            razorpayPaymentId: String,
            razorpaySignature: String,
        },
        totalAmount: {
            type: Number,
            required: true,
        },
        subtotal: {
            type: Number,
            required: true,
        },
        shipping: {
            type: Number,
            default: 0,
        },
        tax: {
            type: Number,
            default: 0,
        },
        orderStatus: {
            type: String,
            enum: ["pending", "paid", "failed", "processing", "shipped", "delivered", "cancelled"],
            default: "pending",
        },
        paymentStatus: {
            type: String,
            enum: ["pending", "completed", "failed"],
            default: "pending",
        },
    },
    {
        timestamps: true,
    }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
