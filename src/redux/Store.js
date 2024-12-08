import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './slice/categorySlice';
import cartSlice from "../Features/Cart/cartSlice";
import wishListSlice from "../Features/Wishlist/wishListSlice";
import dealsSlice from "./slice/dealsSlice";

const store = configureStore({
  reducer: {
    category: categoryReducer,
    cart: cartSlice,
    wishlist: wishListSlice,
    deals: dealsSlice,
  },
});

export default store;
