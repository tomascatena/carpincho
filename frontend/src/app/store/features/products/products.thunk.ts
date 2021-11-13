import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { IProduct } from '../../../types/types';
import { RootState } from '../../store';

export const fetchProducts = createAsyncThunk<
  IProduct[],
  void,
  { state: RootState }
>('products/fetchProducts', async (_, { getState, requestId }) => {
  const { loading, currentRequestId } = getState().products;

  if (loading !== 'pending' || requestId !== currentRequestId) {
    return;
  }

  const { data } = await axios.get('http://localhost:5000/api/v1/products');

  return data.products;
});
