import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slice/auth'
import cartSlice from './slice/cart'

const store = configureStore({
    reducer: {
        auth: authSlice,
        cart: cartSlice,
    }
})

export default store