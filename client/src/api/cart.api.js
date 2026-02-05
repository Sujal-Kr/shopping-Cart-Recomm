import api from "./axiosInstance";

export const getCart = async () => {
    const response = await api.get("/cart");
    return response.data;
};

export const addToCart = async (productData) => {
    const response = await api.post("/cart", productData);
    return response.data;
};

export const removeFromCart = async (productId) => {
    const response = await api.delete(`/cart/remove/${productId}`);
    return response.data;
};

export const updateCartItem = async (itemId, data) => {
    const response = await api.patch(`/cart/${itemId}`, data);
    return response.data;
};

export const clearCart = async () => {
    const response = await api.delete("/cart/clear");
    return response.data;
};
