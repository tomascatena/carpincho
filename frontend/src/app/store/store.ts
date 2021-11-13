import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import productsReducer from './features/products/productsSlice';
import productDetailsReducer from './features/productDetails/productDetailsSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    productDetails: productDetailsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
