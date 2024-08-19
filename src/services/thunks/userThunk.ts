import { getUserApi, loginUserApi, logoutApi, registerUserApi, TLoginData, TRegisterData, updateUserApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { deleteCookie, setCookie } from '../../utils/cookie';

export const loginUserThunk = createAsyncThunk(
  'user/loginUser',
  async (data: TLoginData, {rejectWithValue}) => {
    const userData = await loginUserApi(data);
    if (!userData?.success) {
      return rejectWithValue(userData);
    }
    setCookie('accessToken', userData.accessToken);
    localStorage.setItem('refreshToken', userData.refreshToken);
    return userData.user;
  });

export const registerUserThunk = createAsyncThunk(
  'user/registerUser',
  async (data: TRegisterData, {rejectWithValue}) => {
    const userData = await registerUserApi(data);
    if (!userData?.success) {
      return rejectWithValue(userData);
    }
    setCookie('accessToken', userData.accessToken);
    localStorage.setItem('refreshToken', userData.refreshToken);
    return userData.user;
  });
export const logoutUserThunk = createAsyncThunk(
  'user/logoutUser',
  async () =>  {
    localStorage.removeItem('refreshToken');
    deleteCookie('accessToken');
    return await logoutApi()
  }
  );

export const updateUserThunk = createAsyncThunk(
  'user/updateUser',
  async (data: TRegisterData, {rejectWithValue}) => {
    const userData = await updateUserApi(data);
    if (!userData?.success) {
      return rejectWithValue(userData);
    }
    return userData.user;
  });

export const getUserThunk = createAsyncThunk(
  'user/getUser',
  async (_, {rejectWithValue}) => {
    const userData = await getUserApi();
    if (!userData?.success) {
      return rejectWithValue(userData);
    }
    return userData;
  });
