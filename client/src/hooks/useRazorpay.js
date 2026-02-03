import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { server } from "../constants/config";

/**
 * Custom hook for Razorpay payment integration
 * @returns {Object} { initiatePayment, loading }
 */
export const useRazorpay = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const initiatePayment = async (shippingAddress) => {
        try {
            setLoading(true);

            // Create order on backend
            const { data } = await axios.post(
                `${server}/api/v1/payment/create-order`,
                { shippingAddress },
                { withCredentials: true }
            );

            if (!data.success) {
                throw new Error(data.message || "Failed to create order");
            }

            const { orderId, razorpayOrderId, amount, currency, key } = data.order;

            // Razorpay options
            const options = {
                key,
                amount: Math.round(amount * 100), // Convert to paise
                currency,
                name: "Shopping Cart",
                description: "Purchase from Shopping Cart",
                order_id: razorpayOrderId,
                handler: async function (response) {
                    // Payment successful callback
                    try {
                        const verifyData = await axios.post(
                            `${server}/api/v1/payment/verify`,
                            {
                                orderId,
                                razorpayOrderId: response.razorpay_order_id,
                                razorpayPaymentId: response.razorpay_payment_id,
                                razorpaySignature: response.razorpay_signature,
                            },
                            { withCredentials: true }
                        );

                        if (verifyData.data.success) {
                            toast.success("Payment successful!");
                            navigate(`/order/success?orderId=${orderId}`);
                        } else {
                            throw new Error("Payment verification failed");
                        }
                    } catch (error) {
                        toast.error(error.response?.data?.message || "Payment verification failed");
                        navigate("/order/failed");
                    }
                },
                prefill: {
                    name: shippingAddress.fullName,
                    contact: shippingAddress.phone,
                },
                theme: {
                    color: "#7c3aed", // Violet theme
                },
                modal: {
                    ondismiss: function () {
                        setLoading(false);
                        toast.error("Payment cancelled");
                    },
                },
            };

            // Open Razorpay checkout
            const rzp = new window.Razorpay(options);

            rzp.on("payment.failed", function (response) {
                toast.error(response.error.description || "Payment failed");
                setLoading(false);
            });

            rzp.open();
        } catch (error) {
            console.error("Payment initiation error:", error);
            toast.error(error.response?.data?.message || "Failed to initiate payment");
            setLoading(false);
        }
    };

    return { initiatePayment, loading };
};
