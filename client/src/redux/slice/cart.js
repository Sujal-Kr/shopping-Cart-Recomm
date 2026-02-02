import { createSlice } from "@reduxjs/toolkit";

// Load cart from localStorage
const loadCartFromStorage = () => {
    try {
        const cart = localStorage.getItem("cart");
        return cart ? JSON.parse(cart) : [];
    } catch {
        return [];
    }
};

// Save cart to localStorage
const saveCartToStorage = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
};

const initialState = {
    items: loadCartFromStorage(),
    loading: false,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const { product, quantity = 1 } = action.payload;
            const existingItem = state.items.find(
                (item) => item.name === product.name
            );

            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                state.items.push({
                    ...product,
                    quantity,
                });
            }
            saveCartToStorage(state.items);
        },

        removeFromCart: (state, action) => {
            const productName = action.payload;
            state.items = state.items.filter((item) => item.name !== productName);
            saveCartToStorage(state.items);
        },

        updateQuantity: (state, action) => {
            const { productName, quantity } = action.payload;
            const item = state.items.find((item) => item.name === productName);

            if (item) {
                if (quantity <= 0) {
                    state.items = state.items.filter((item) => item.name !== productName);
                } else {
                    item.quantity = quantity;
                }
            }
            saveCartToStorage(state.items);
        },

        incrementQuantity: (state, action) => {
            const productName = action.payload;
            const item = state.items.find((item) => item.name === productName);
            if (item) {
                item.quantity += 1;
            }
            saveCartToStorage(state.items);
        },

        decrementQuantity: (state, action) => {
            const productName = action.payload;
            const item = state.items.find((item) => item.name === productName);
            if (item) {
                if (item.quantity > 1) {
                    item.quantity -= 1;
                } else {
                    state.items = state.items.filter((item) => item.name !== productName);
                }
            }
            saveCartToStorage(state.items);
        },

        clearCart: (state) => {
            state.items = [];
            saveCartToStorage(state.items);
        },

        setCartLoading: (state, action) => {
            state.loading = action.payload;
        },
    },
});

// Selectors
export const selectCartItems = (state) => state.cart.items;
export const selectCartItemsCount = (state) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0);
export const selectCartTotal = (state) =>
    state.cart.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

export const {
    addToCart,
    removeFromCart,
    updateQuantity,
    incrementQuantity,
    decrementQuantity,
    clearCart,
    setCartLoading,
} = cartSlice.actions;

export default cartSlice.reducer;
