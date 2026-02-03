const Order = require("../models/order.model");
const { createOrder, verifySignature } = require("../services/razorpay.service");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/error");
const _ = require("lodash");
const cartModel = require("../models/cart.model");
/**
 * Create Razorpay order
 * @route POST /api/v1/payment/create-order
 * @access Private
 */
const createRazorpayOrder = asyncHandler(async (req, res, next) => {
    try {
        const userId = req.user;
        const { shippingAddress } = req.body;

        // Fetch user's cart
        const cart = await cartModel.findOne({ user: userId }).populate("items.product");

        if (_.isEmpty(cart) || _.isArray(cart)) {
            throw new ApiError("Cart is empty", 400);
        }

        // Calculate totals
        const subtotal = cart.items.reduce((total, item) => {
            return total + (item.product.price * item.quantity);
        }, 0);

        const shipping = subtotal >= 50 ? 0 : 5.99;
        const tax = subtotal * 0.08;
        const totalAmount = subtotal + shipping + tax;

        // Create Razorpay order
        const receipt = `order_${userId}_${Date.now()}`;
        const razorpayOrder = await createOrder(totalAmount, "INR", receipt);

        // Prepare order items
        const orderItems = cart.items.map(item => ({
            product: item.product._id,
            name: item.product.name,
            price: item.product.price,
            quantity: item.quantity,
            image: item.product.image,
        }));

        // Create order in database
        const order = await Order.create({
            user: userId,
            items: orderItems,
            shippingAddress,
            paymentDetails: {
                razorpayOrderId: razorpayOrder.id,
            },
            totalAmount,
            subtotal,
            shipping,
            tax,
            orderStatus: "pending",
            paymentStatus: "pending",
        });

        res.status(201).json({
            success: true,
            order: {
                orderId: order._id,
                razorpayOrderId: razorpayOrder.id,
                amount: totalAmount,
                currency: razorpayOrder.currency,
                key: process.env.RAZORPAY_KEY_ID,
            },
            message: "Order created successfully",
        });
    } catch (error) {
        next(error);
    }
});

/**
 * Verify payment and update order
 * @route POST /api/v1/payment/verify
 * @access Private
 */
const verifyPayment = asyncHandler(async (req, res, next) => {
    try {
        const { orderId, razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body;

        // Verify signature
        const isValid = verifySignature(razorpayOrderId, razorpayPaymentId, razorpaySignature);

        if (!isValid) {
            throw new ApiError("Invalid payment signature", 400);
        }

        // Update order
        const order = await Order.findById(orderId);

        if (!order) {
            throw new ApiError("Order not found", 404);
        }

        // Check if user owns this order
        if (order.user.toString() !== req.user.toString()) {
            throw new ApiError("Unauthorized", 403);
        }

        // Update payment details
        order.paymentDetails.razorpayPaymentId = razorpayPaymentId;
        order.paymentDetails.razorpaySignature = razorpaySignature;
        order.paymentStatus = "completed";
        order.orderStatus = "paid";

        await order.save();

        // Clear user's cart
        await Cart.findOneAndUpdate(
            { user: req.user },
            { $set: { items: [] } }
        );

        res.status(200).json({
            success: true,
            order: {
                orderId: order._id,
                orderStatus: order.orderStatus,
                paymentStatus: order.paymentStatus,
            },
            message: "Payment verified successfully",
        });
    } catch (error) {
        // Update order status to failed if verification fails
        if (req.body.orderId) {
            await Order.findByIdAndUpdate(req.body.orderId, {
                paymentStatus: "failed",
                orderStatus: "failed",
            });
        }
        next(error);
    }
});

/**
 * Get all orders for user
 * @route GET /api/v1/payment/orders
 * @access Private
 */
const getUserOrders = asyncHandler(async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const orders = await Order.find({ user: req.user })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .populate("items.product", "name image");

        const totalOrders = await Order.countDocuments({ user: req.user});

        res.status(200).json({
            success: true,
            orders,
            page,
            limit,
            totalPages: Math.ceil(totalOrders / limit),
            totalOrders,
            message: "Orders fetched successfully",
        });
    } catch (error) {
        next(error);
    }
});

/**
 * Get order by ID
 * @route GET /api/v1/payment/orders/:id
 * @access Private
 */
const getOrderById = asyncHandler(async (req, res, next) => {
    try {
        const { id } = req.params;

        const order = await Order.findById(id).populate("items.product", "name image brand");

        if (!order) {
            throw new ApiError("Order not found", 404);
        }

        // Check if user owns this order
        if (order.user.toString() !== req.user.toString()) {
            throw new ApiError("Unauthorized", 403);
        }

        res.status(200).json({
            success: true,
            order,
            message: "Order fetched successfully",
        });
    } catch (error) {
        next(error);
    }
});

module.exports = {
    createRazorpayOrder,
    verifyPayment,
    getUserOrders,
    getOrderById,
};
