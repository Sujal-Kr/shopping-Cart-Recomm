import api from "./axiosInstance";

// Create order with Razorpay
export const createOrder = async (orderData) => {
    const response = await api.post("/payment/create-order", orderData);
    return response.data;
};

// Verify Razorpay payment
export const verifyPayment = async (paymentData) => {
    const response = await api.post("/payment/verify", paymentData);
    return response.data;
};

// Get all user orders
export const getUserOrders = async (params) => {
    const response = await api.get("/payment/orders", { params });
    return response.data;
};

// Get specific order by ID
export const getOrderById = async (orderId) => {
    const response = await api.get(`/payment/orders/${orderId}`);
    return response.data;
};

