import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { IProduct } from '../../../types/types';
import { RootState } from '../../store';

export const addToCart = createAsyncThunk<
  IProduct,
  { productId: number },
  { state: RootState }
>('products/addToCart', async ({ productId }, { getState, requestId }) => {
  const { loading, currentRequestId } = getState().cart;

  if (loading !== 'pending' || requestId !== currentRequestId) {
    return;
  }

  const { data } = await axios.get(`/api/v1/products/${productId}`);

  return data.product;
});
