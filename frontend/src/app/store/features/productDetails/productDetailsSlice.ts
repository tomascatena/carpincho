import { createSlice, SerializedError } from '@reduxjs/toolkit';
import { IProduct } from '../../../types/types';
import { fetchProductById } from './productDetails.thunk';

export interface ProductState {
  productDetails: IProduct | null;
  loading: 'idle' | 'pending';
  currentRequestId: string | undefined;
  error: SerializedError | null;
}

const initialState: ProductState = {
  productDetails: null,
  loading: 'idle',
  currentRequestId: undefined,
  error: null,
};

export const productDetailsSlice = createSlice({
  name: 'productDetails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductById.pending, (state, action) => {
        if (state.loading === 'idle') {
          state.loading = 'pending';
          state.error = null;
          state.currentRequestId = action.meta.requestId;
        }
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        const { requestId } = action.meta;
        if (
          state.loading === 'pending' &&
          state.currentRequestId === requestId
        ) {
          state.loading = 'idle';
          state.productDetails = action.payload;
          state.currentRequestId = undefined;
        }
      })
      .addCase(fetchProductById.rejected, (state, action) => {
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

export const productActions = productDetailsSlice.actions;

export default productDetailsSlice.reducer;
