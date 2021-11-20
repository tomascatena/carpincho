import { createSlice, SerializedError } from '@reduxjs/toolkit';
import { IUser, Nullable } from '../../../types/types';
import { userLogin } from './user.thunk';

export interface UserState {
  user: Nullable<IUser>;
  loading: 'idle' | 'pending';
  currentRequestId: string | undefined;
  error: SerializedError | null;
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
    userLogout(state) {
      state.user = null;
      state.loading = 'idle';
      state.error = null;
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
      });
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
