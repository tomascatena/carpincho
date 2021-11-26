import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import productsReducer from './features/products/productsSlice';
import productDetailsReducer from './features/productDetails/productDetailsSlice';
import cartReducer from './features/cart/cartSlice';
import userReducer from './features/user/userSlice';
import { getCartStateFromLocalStorage } from './getCartStateFromLocalStorage';
import { getUserInfoFromLocalStorage } from './getUserInfoFromLocalStorage';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    user: userReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

getCartStateFromLocalStorage();
getUserInfoFromLocalStorage();

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
