import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { IUser } from '../../../types/types';
import { RootState } from '../../store';

export const userLogin = createAsyncThunk<
  IUser,
  Pick<IUser, 'email' | 'password'>,
  { state: RootState }
>('user/userLogin', async ({ email, password }, { getState, requestId }) => {
  const { loading, currentRequestId } = getState().user;

  if (loading !== 'pending' || requestId !== currentRequestId) {
    return;
  }

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const { data } = await axios.post(
    '/api/v1/users/login',
    {
      email,
      password,
    },
    config
  );

  return data;
});
