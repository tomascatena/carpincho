import { createSlice, SerializedError, PayloadAction } from '@reduxjs/toolkit';
import { Nullable, CreatedOrder, OrderDetails } from '../../../types/types';
import { createOrder, getOrderDetails } from './order.thunk';

export interface UserState {
  placedOrder: Nullable<CreatedOrder>;
  orderDetails: Nullable<OrderDetails>;
  loading: 'idle' | 'pending';
  currentRequestId: string | undefined;
  error: SerializedError | null;
}

const initialState: UserState = {
  placedOrder: null,
  orderDetails: null,
  loading: 'idle',
  currentRequestId: undefined,
  error: null,
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setError(state, action: PayloadAction<SerializedError>) {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state, action) => {
        if (state.loading === 'idle') {
          state.placedOrder = null;
          state.loading = 'pending';
          state.error = null;
          state.currentRequestId = action.meta.requestId;
        }
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        const { requestId } = action.meta;
        if (
          state.loading === 'pending' &&
          state.currentRequestId === requestId
        ) {
          state.placedOrder = action.payload;
          state.loading = 'idle';
          state.currentRequestId = undefined;
        }
      })
      .addCase(createOrder.rejected, (state, action) => {
        const { requestId } = action.meta;
        if (
          state.loading === 'pending' &&
          state.currentRequestId === requestId
        ) {
          state.placedOrder = null;
          state.loading = 'idle';
          state.error = action.error;
          state.currentRequestId = undefined;
        }
      })
      .addCase(getOrderDetails.pending, (state, action) => {
        if (state.loading === 'idle') {
          state.orderDetails = null;
          state.loading = 'pending';
          state.error = null;
          state.currentRequestId = action.meta.requestId;
        }
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        const { requestId } = action.meta;
        if (
          state.loading === 'pending' &&
          state.currentRequestId === requestId
        ) {
          state.orderDetails = action.payload;
          state.loading = 'idle';
          state.currentRequestId = undefined;
        }
      })
      .addCase(getOrderDetails.rejected, (state, action) => {
        const { requestId } = action.meta;
        if (
          state.loading === 'pending' &&
          state.currentRequestId === requestId
        ) {
          state.orderDetails = null;
          state.loading = 'idle';
          state.error = action.error;
          state.currentRequestId = undefined;
        }
      });
  },
});

export const orderActions = orderSlice.actions;

export default orderSlice.reducer;
