import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { IProduct } from '../../../types/types';
import { RootState } from '../../store';

export const fetchProductById = createAsyncThunk<
  IProduct,
  string,
  { state: RootState }
>('products/fetchProductById', async (productId, { getState, requestId }) => {
  const { loading, currentRequestId } = getState().productDetails;

  if (loading !== 'pending' || requestId !== currentRequestId) {
    return;
  }

  const { data } = await axios.get(`/api/v1/products/${productId}`);

  return data.product;
});
