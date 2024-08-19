import { RequestStatus, TOrder } from '@utils-types';
import { createSlice } from '@reduxjs/toolkit';
import { getOrderByNumber, orderBurger } from '../thunks/orderThunk';

export interface TOrderState {
  data: TOrder | null;
  status: RequestStatus;
}

export const initialState: TOrderState = {
  data: null,
  status: RequestStatus.Idle,
}

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrder: (state, action) => ({
      ...state,
      data: action.payload
    }),
    reloadOrder: (state: TOrderState) => ({
      ...state,
      data: null
    })
  },
  selectors: {
    selectOrderData: (state) => state.data,
    selectOrderStatus: (state) => state.status,
  },
  extraReducers: (builder) => {
    builder.addCase(orderBurger.pending, (state) => {
      state.status = RequestStatus.Loading;
    })
    builder.addCase(orderBurger.fulfilled, (state, action) => {
      state.data = action.payload.order;
      state.status = RequestStatus.Success;
    })
    builder.addCase(orderBurger.rejected, (state) => {
      state.status = RequestStatus.Failed;
    })
    builder.addCase(getOrderByNumber.pending, (state) => {
      state.status = RequestStatus.Loading;
    })
    builder.addCase(getOrderByNumber.fulfilled, (state, action) => {
      state.data = action.payload.orders[0];
      state.status = RequestStatus.Success;
    })
    builder.addCase(getOrderByNumber.rejected, (state) => {
      state.status = RequestStatus.Failed;
    });
  }
});


export const orderSelectors = orderSlice.selectors;
export const orderReducer = orderSlice.reducer;
export const orderActions = orderSlice.actions;
