import { RequestStatus, TOrder } from '@utils-types';
import { createSlice } from '@reduxjs/toolkit';
import { fetchOrders } from '../thunks/ordersThunk';

export interface TOrdersState {
  orders: TOrder[] | [];
  status: RequestStatus;
}

export const initialState: TOrdersState = {
  orders: [],
  status: RequestStatus.Idle
};

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setOrders: (state, action) => ({
      ...state,
      orders: action.payload
    })
  },
  selectors: {
    selectOrders: (state: TOrdersState) => state.orders,
    selectOrdersStatus: (state: TOrdersState) => state.status
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOrders.pending, (state) => {
      state.status = RequestStatus.Loading;
    });
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      state.orders = action.payload;
      state.status = RequestStatus.Success;
    });
    builder.addCase(fetchOrders.rejected, (state) => {
      state.status = RequestStatus.Failed;
    });
  }
});

export const ordersSelectors = ordersSlice.selectors;
export const ordersActions = ordersSlice.actions;
export const ordersReducer = ordersSlice.reducer;
