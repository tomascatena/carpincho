import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Order, PlaceOrder } from '../../../types/types';
import { RootState } from '../../store';

export const createOrder = createAsyncThunk<
  Order,
  PlaceOrder,
  { state: RootState }
>('order/createOrder', async (order, { getState, requestId }) => {
  const { user } = getState().user;
  const { loading, currentRequestId } = getState().order;

  if (loading !== 'pending' || requestId !== currentRequestId) {
    return;
  }

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user?.tokens?.access.token}`,
    },
  };

  const { data } = await axios.post('/api/v1/orders', order, config);

  return data.createdOrder;
});
