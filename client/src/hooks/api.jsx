import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { server } from "../constants/config";

// Create axios instance with default config
const api = axios.create({
  baseURL: `${server}/api/v1`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// ============================================
// Generic Fetch Hook (GET requests)
// ============================================
export const useFetch = (endpoint, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { params = {}, enabled = true, onSuccess, onError } = options;

  const fetchData = useCallback(async () => {
    if (!enabled) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await api.get(endpoint, { params });
      setData(response.data);
      onSuccess?.(response.data)                                                                                                                                                                                                              ;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message;
      setError(errorMessage);
      onError?.(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [endpoint, JSON.stringify(params), enabled]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch };
};

// ============================================
// Mutation Hook (POST, PUT, PATCH, DELETE)
// ============================================
export const useMutation = (method = "post") => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const mutate = useCallback(
    async (endpoint, payload = {}, options = {}) => {
      const { onSuccess, onError } = options;

      try {
        setLoading(true);
        setError(null);

        let response;
        if (method === "delete") {
          response = await api.delete(endpoint, { data: payload });
        } else {
          response = await api[method](endpoint, payload);
        }

        setData(response.data);
        onSuccess?.(response.data);
        return { success: true, data: response.data };
      } catch (err) {
        const errorMessage = err.response?.data?.message || err.message;
        setError(errorMessage);
        onError?.(errorMessage);
        return { success: false, error: errorMessage };
      } finally {
        setLoading(false);
      }
    },
    [method],
  );

  const reset = useCallback(() => {
    setData(null);
    setError(null);
  }, []);

  return { mutate, data, loading, error, reset };
};

// ============================================
// Specific API Hooks
// ============================================

// Products
export const useProducts = (params = {}) => {
  return useFetch("/product", { params });
};

export const useProduct = (id) => {
  return useFetch(`/product/${id}`, { enabled: !!id });
};

// Auth
export const useCurrentUser = () => {
  return useFetch("/auth/me");
};

// Categories
export const useCategories = () => {
  return useFetch("/category");
};

// Cart
export const useCart = () => {
  return useFetch("/cart");
};

// Orders
export const useOrders = () => {
  return useFetch("/order");
};

export const useOrder = (id) => {
  return useFetch(`/order/${id}`, { enabled: !!id });
};

// ============================================
// Mutation Hooks
// ============================================

// Auth mutations
export const useLogin = () => {
  const { mutate, ...rest } = useMutation("post");

  const login = useCallback(
    (credentials, options) => mutate("/auth/login", credentials, options),
    [mutate],
  );

  return { login, ...rest };
};

export const useRegister = () => {
  const { mutate, ...rest } = useMutation("post");

  const register = useCallback(
    (userData, options) => mutate("/auth/signup", userData, options),
    [mutate],
  );

  return { register, ...rest };
};

export const useLogout = () => {
  const { mutate, ...rest } = useMutation("get");

  const logout = useCallback(
    (options) => mutate("/auth/logout", {}, options),
    [mutate],
  );

  return { logout, ...rest };
};

// Cart mutations
export const useAddToCart = () => {
  const { mutate, ...rest } = useMutation("post");

  const addToCart = useCallback(
    (productData, options) => {
        console.log("addToCart",productData);
        mutate("/cart/", productData, options);
    },
    [mutate],
  );

  return { addToCart, ...rest };
};

export const useRemoveFromCart = () => {
  const { mutate, ...rest } = useMutation("delete");

  const removeFromCart = useCallback(
    (productId, options) => mutate(`/cart/remove/${productId}`, {}, options),
    [mutate],
  );

  return { removeFromCart, ...rest };
};

export const useUpdateCartItem = () => {
  const { mutate, ...rest } = useMutation("patch");

  const updateCartItem = useCallback(
    (itemId, data, options) => mutate(`/cart/update/${itemId}`, data, options),
    [mutate],
  );

  return { updateCartItem, ...rest };
};

// Order mutations
export const useCreateOrder = () => {
  const { mutate, ...rest } = useMutation("post");

  const createOrder = useCallback(
    (orderData, options) => mutate("/order/create", orderData, options),
    [mutate],
  );

  return { createOrder, ...rest };
};

// Newsletter
export const useSubscribeNewsletter = () => {
  const { mutate, ...rest } = useMutation("post");

  const subscribe = useCallback(
    (email, options) => mutate("/newsletter/subscribe", { email }, options),
    [mutate],
  );

  return { subscribe, ...rest };
};

// Export axios instance for custom requests
export { api };
