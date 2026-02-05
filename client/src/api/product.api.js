import api from "./axiosInstance";

export const getProducts = async (params) => {
    const response = await api.get("/product", { params });
    return response.data;
};

export const getProduct = async (id) => {
    const response = await api.get(`/product/${id}`);
    return response.data;
};

export const getCategories = async () => {
    const response = await api.get("/category");
    return response.data;
};