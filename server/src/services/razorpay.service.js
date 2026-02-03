const Razorpay = require("razorpay");
const crypto = require("crypto");

// Initialize Razorpay instance
const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

/**
 * Create a Razorpay order
 * @param {number} amount - Amount in smallest currency unit (paise for INR)
 * @param {string} currency - Currency code (default: INR)
 * @param {string} receipt - Receipt ID for tracking
 * @returns {Promise<Object>} Razorpay order object
 */
const createOrder = async (amount, currency = "INR", receipt) => {
    try {
        const options = {
            amount: Math.round(amount * 100), // Convert to paise
            currency,
            receipt,
            payment_capture: 1, // Auto capture payment
        };

        const order = await razorpayInstance.orders.create(options);
        return order;
    } catch (error) {
        throw new Error(`Razorpay order creation failed: ${error.message}`);
    }
};

/**
 * Verify Razorpay payment signature
 * @param {string} orderId - Razorpay order ID
 * @param {string} paymentId - Razorpay payment ID
 * @param {string} signature - Razorpay signature
 * @returns {boolean} True if signature is valid
 */
const verifySignature = (orderId, paymentId, signature) => {
    try {
        const generatedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(orderId + "|" + paymentId)
            .digest("hex");

        return generatedSignature === signature;
    } catch (error) {
        throw new Error(`Signature verification failed: ${error.message}`);
    }
};

/**
 * Fetch payment details
 * @param {string} paymentId - Razorpay payment ID
 * @returns {Promise<Object>} Payment details
 */
const getPaymentDetails = async (paymentId) => {
    try {
        const payment = await razorpayInstance.payments.fetch(paymentId);
        return payment;
    } catch (error) {
        throw new Error(`Failed to fetch payment details: ${error.message}`);
    }
};

module.exports = {
    razorpayInstance,
    createOrder,
    verifySignature,
    getPaymentDetails,
};
