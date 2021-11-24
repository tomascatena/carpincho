import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { IUser } from '../../../types/types';
import { RootState } from '../../store';
import { userActions } from './userSlice';

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

export const userRegister = createAsyncThunk<
  IUser,
  Pick<IUser, 'name' | 'email' | 'password' | 'confirmPassword'>,
  { state: RootState }
>(
  'user/userRegister',
  async (
    { name, email, password, confirmPassword },
    { getState, requestId, dispatch }
  ) => {
    const { loading, currentRequestId } = getState().user;

    if (loading !== 'pending' || requestId !== currentRequestId) {
      return;
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const { data } = await axios.post(
        '/api/v1/users',
        { name, email, password, confirmPassword },
        config
      );

      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        dispatch(userActions.setError(error.response?.data.message));
      }
    }
  }
);
