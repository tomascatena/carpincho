import { createSlice, SerializedError } from '@reduxjs/toolkit';
import { IProduct } from '../../../types/types';
import { fetchProducts } from './products.thunk';

export interface ProductsState {
  products: IProduct[];
  loading: 'idle' | 'pending';
  currentRequestId: string | undefined;
  error: SerializedError | null;
}

const initialState: ProductsState = {
  products: [],
  loading: 'idle',
  currentRequestId: undefined,
  error: null,
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        if (state.loading === 'idle') {
          state.loading = 'pending';
          state.currentRequestId = action.meta.requestId;
        }
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        const { requestId } = action.meta;
        if (
          state.loading === 'pending' &&
          state.currentRequestId === requestId
        ) {
          state.loading = 'idle';
          state.products = action.payload;
          state.currentRequestId = undefined;
        }
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        const { requestId } = action.meta;
        if (
          state.loading === 'pending' &&
          state.currentRequestId === requestId
        ) {
          state.loading = 'idle';
          state.error = action.error;
          state.currentRequestId = undefined;
        }
      });
  },
});

export const productActions = productsSlice.actions;

export default productsSlice.reducer;
