import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  CreatedOrder,
  OrderDetails,
  PaymentResult,
  PlaceOrder,
  UpdatedOrder,
} from '../../../types/types';
import { RootState } from '../../store';
import { orderActions } from './orderSlice';

export const createOrder = createAsyncThunk<
  CreatedOrder,
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

export const getOrderDetails = createAsyncThunk<
  OrderDetails,
  string,
  { state: RootState }
>(
  'order/getOrderDetails',
  async (orderId, { getState, requestId, dispatch }) => {
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

    try {
      const { data } = await axios.get(`/api/v1/orders/${orderId}`, config);

      return data.order;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        dispatch(orderActions.setError(error.response?.data));
      }
    }
  }
);

export const orderPay = createAsyncThunk<
  UpdatedOrder,
  { orderId: string; paymentResult: PaymentResult },
  { state: RootState }
>(
  'order/orderPay',
  async ({ paymentResult, orderId }, { getState, requestId, dispatch }) => {
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

    try {
      const { data } = await axios.put(
        `/api/v1/orders/${orderId}/pay`,
        paymentResult,
        config
      );

      return data.order;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        dispatch(orderActions.setError(error.response?.data));
      }
    }
  }
);
