import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import productsReducer from './features/products/productsSlice';
import productDetailsReducer from './features/productDetails/productDetailsSlice';
import cartReducer from './features/cart/cartSlice';
import userReducer from './features/user/userSlice';
import { cartMiddleware } from './features/cart/cart.middleware';
import { logger } from './middleware/logger.middleware';
import { getCartITemsFromLocalStorage } from './getCartItemsFromLocalStorage';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(cartMiddleware, logger);
  },
  devTools: process.env.NODE_ENV !== 'production',
});

getCartITemsFromLocalStorage();

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
