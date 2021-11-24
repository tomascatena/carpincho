import { createSlice, SerializedError, PayloadAction } from '@reduxjs/toolkit';
import { IUser, Nullable } from '../../../types/types';
import {
  userLogin,
  userRegister,
  updateUserProfile,
  getUserProfile,
} from './user.thunk';

export interface UserState {
  user: Nullable<IUser>;
  loading: 'idle' | 'pending';
  currentRequestId: string | undefined;
  error: SerializedError | null | string;
}

const initialState: UserState = {
  user: null,
  loading: 'idle',
  currentRequestId: undefined,
  error: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    hydrateUserInfo: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    userLogout(state) {
      state.user = null;
      state.loading = 'idle';
      state.error = null;

      localStorage.removeItem('userInfo');
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state, action) => {
        if (state.loading === 'idle') {
          state.user = null;
          state.loading = 'pending';
          state.error = null;
          state.currentRequestId = action.meta.requestId;
        }
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        const { requestId } = action.meta;
        if (
          state.loading === 'pending' &&
          state.currentRequestId === requestId
        ) {
          state.user = action.payload;
          state.loading = 'idle';
          state.currentRequestId = undefined;

          localStorage.setItem('userInfo', JSON.stringify(state.user));
        }
      })
      .addCase(userLogin.rejected, (state, action) => {
        const { requestId } = action.meta;
        if (
          state.loading === 'pending' &&
          state.currentRequestId === requestId
        ) {
          state.user = null;
          state.loading = 'idle';
          state.error = action.error;
          state.currentRequestId = undefined;
        }
      })
      .addCase(userRegister.pending, (state, action) => {
        if (state.loading === 'idle') {
          state.user = null;
          state.loading = 'pending';
          state.error = null;
          state.currentRequestId = action.meta.requestId;
        }
      })
      .addCase(userRegister.fulfilled, (state, action) => {
        const { requestId } = action.meta;
        if (
          state.loading === 'pending' &&
          state.currentRequestId === requestId
        ) {
          state.user = action.payload;
          state.loading = 'idle';
          state.currentRequestId = undefined;

          localStorage.setItem('userInfo', JSON.stringify(state.user));
        }
      })
      .addCase(userRegister.rejected, (state, action) => {
        const { requestId } = action.meta;
        if (
          state.loading === 'pending' &&
          state.currentRequestId === requestId
        ) {
          state.user = null;
          state.loading = 'idle';
          state.error = action.error;
          state.currentRequestId = undefined;
        }
      })
      .addCase(getUserProfile.pending, (state, action) => {
        if (state.loading === 'idle') {
          state.user = null;
          state.loading = 'pending';
          state.error = null;
          state.currentRequestId = action.meta.requestId;
        }
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        const { requestId } = action.meta;
        if (
          state.loading === 'pending' &&
          state.currentRequestId === requestId
        ) {
          state.user = action.payload;
          state.loading = 'idle';
          state.currentRequestId = undefined;
        }
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        const { requestId } = action.meta;
        if (
          state.loading === 'pending' &&
          state.currentRequestId === requestId
        ) {
          state.user = null;
          state.loading = 'idle';
          state.error = action.error;
          state.currentRequestId = undefined;
        }
      })
      .addCase(updateUserProfile.pending, (state, action) => {
        if (state.loading === 'idle') {
          state.user = null;
          state.loading = 'pending';
          state.error = null;
          state.currentRequestId = action.meta.requestId;
        }
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        const { requestId } = action.meta;
        if (
          state.loading === 'pending' &&
          state.currentRequestId === requestId
        ) {
          state.user = action.payload;
          state.loading = 'idle';
          state.currentRequestId = undefined;

          localStorage.setItem('userInfo', JSON.stringify(state.user));
        }
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        const { requestId } = action.meta;
        if (
          state.loading === 'pending' &&
          state.currentRequestId === requestId
        ) {
          state.user = null;
          state.loading = 'idle';
          state.error = action.error;
          state.currentRequestId = undefined;
        }
      });
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
