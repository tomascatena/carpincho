import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { IUser } from '../../../types/types';
import { RootState } from '../../store';
import { userActions } from './userSlice';

export const userLogin = createAsyncThunk<
  IUser,
  Pick<IUser, 'email' | 'password'>,
  { state: RootState }
>(
  'user/userLogin',
  async ({ email, password }, { getState, requestId, dispatch }) => {
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
        '/api/v1/users/login',
        {
          email,
          password,
        },
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

export const getUserProfile = createAsyncThunk<
  IUser,
  string,
  { state: RootState }
>('user/getUserProfile', async (id, { getState, requestId, dispatch }) => {
  const { loading, currentRequestId, user } = getState().user;

  if (loading !== 'pending' || requestId !== currentRequestId) {
    return;
  }

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user?.tokens?.access}`,
    },
  };

  try {
    const { data } = await axios.get(`/api/v1/users/${id}`, config);

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      dispatch(userActions.setError(error.response?.data.message));
    }
  }
});

export const updateUserProfile = createAsyncThunk<
  IUser,
  Partial<Pick<IUser, 'name' | 'email' | 'password'>>,
  { state: RootState }
>(
  'user/updateUserProfile',
  async (userDetailsToUpdate, { getState, requestId, dispatch }) => {
    const { loading, currentRequestId, user } = getState().user;

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
        '/api/v1/users/profile',
        userDetailsToUpdate,
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
