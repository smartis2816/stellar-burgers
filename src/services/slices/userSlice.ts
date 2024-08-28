import { RequestStatus, TUser } from '@utils-types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  getUserThunk,
  loginUserThunk,
  logoutUserThunk,
  registerUserThunk,
  updateUserThunk
} from '../thunks/userThunk';

export interface TUserState {
  user: TUser | null;
  status: RequestStatus;
  isAuthChecked: boolean;
}

export const initialState: TUserState = {
  user: null,
  status: RequestStatus.Idle,
  isAuthChecked: false
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authChecked: (state) => {
      state.isAuthChecked = true;
    }
  },
  selectors: {
    selectUser: (state: TUserState) => state.user,
    selectUserStatus: (state: TUserState) => state.status,
    isAuthCheckedSelector: (state: TUserState) => state.isAuthChecked
  },
  extraReducers: (builder) => {
    builder.addCase(getUserThunk.pending, (state) => {
      state.status = RequestStatus.Loading;
    });
    builder.addCase(getUserThunk.fulfilled, (state, action) => {
      state.status = RequestStatus.Success;
      state.user = action.payload;
    });
    builder.addCase(getUserThunk.rejected, (state) => {
      state.status = RequestStatus.Failed;
    });
    builder.addCase(loginUserThunk.pending, (state) => {
      state.status = RequestStatus.Loading;
    });
    builder.addCase(loginUserThunk.fulfilled, (state, action) => {
      state.user = action.payload;
      state.status = RequestStatus.Success;
    });
    builder.addCase(loginUserThunk.rejected, (state) => {
      state.status = RequestStatus.Failed;
    });
    builder.addCase(logoutUserThunk.pending, (state) => {
      state.status = RequestStatus.Loading;
    });
    builder.addCase(logoutUserThunk.fulfilled, (state) => {
      state.user = null;
      state.status = RequestStatus.Success;
    });
    builder.addCase(logoutUserThunk.rejected, (state) => {
      state.status = RequestStatus.Failed;
    });
    builder.addCase(registerUserThunk.pending, (state) => {
      state.status = RequestStatus.Loading;
    });
    builder.addCase(registerUserThunk.fulfilled, (state, action) => {
      state.user = action.payload;
      state.status = RequestStatus.Success;
    });
    builder.addCase(registerUserThunk.rejected, (state) => {
      state.status = RequestStatus.Failed;
    });
    builder.addCase(updateUserThunk.pending, (state) => {
      state.status = RequestStatus.Loading;
    });
    builder.addCase(updateUserThunk.fulfilled, (state, action) => {
      state.user = action.payload;
      state.status = RequestStatus.Success;
    });
    builder.addCase(updateUserThunk.rejected, (state) => {
      state.status = RequestStatus.Failed;
    });
  }
});

export const userSelectors = userSlice.selectors;
export const userActions = userSlice.actions;
export const userReducer = userSlice.reducer;
