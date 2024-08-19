import {createAsyncThunk} from "@reduxjs/toolkit";
import { getOrderByNumberApi, orderBurgerApi } from '@api';


export const orderBurger = createAsyncThunk(
  'order/orderBurger',
  async (data: string[]) => await orderBurgerApi(data)
);

export const getOrderByNumber = createAsyncThunk(
  'order/getOrderByNumber',
  async (number: number, {rejectWithValue}) => {
    const order = await getOrderByNumberApi(number)
    if (!order) {
      return rejectWithValue(order);
    }
    return order;
  }
);
