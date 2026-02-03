const express = require("express");
const protectRoute = require("../middleware/auth");
const { objectIdSchema } = require("../schema/_id");
const validator = require("../middleware/validator");
const { createOrderSchema, verifyPaymentSchema } = require("../schema/order");
const {
    createRazorpayOrder,
    verifyPayment,
    getUserOrders,
    getOrderById,
} = require("../controllers/payment.controller");

const paymentRouter = express.Router();

// All payment routes require authentication
paymentRouter.use(protectRoute);

// Create Razorpay order
paymentRouter.post("/create-order", validator(createOrderSchema), createRazorpayOrder);

// Verify payment
paymentRouter.post("/verify", validator(verifyPaymentSchema), verifyPayment);

// Get all user orders
paymentRouter.get("/orders", getUserOrders);

// Get specific order
paymentRouter.get("/orders/:id", validator(objectIdSchema, "params"), getOrderById);

module.exports = paymentRouter;
