import { RequestStatus, TOrder } from '@utils-types';
import { createSlice } from '@reduxjs/toolkit';
import { feedThunk } from '../thunks/feedThunk';


export interface TBurgerIngredientsState {
  orders: Array<TOrder> | [];
  total: number;
  totalToday: number;
  status: RequestStatus;
}

export const initialState: TBurgerIngredientsState = {
  orders: [],
  total: 0,
  totalToday: 0,
  status: RequestStatus.Idle,
}

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  selectors: {
    selectOrders: (state: TBurgerIngredientsState) => state.orders,
    selectTotal: (state: TBurgerIngredientsState) => state.total,
    selectTotalToday: (state: TBurgerIngredientsState) => state.totalToday,
    selectStatus: (state: TBurgerIngredientsState) => state.status,
  },
  extraReducers(builder) {
    builder.addCase(feedThunk.pending, (state) => {
      state.status = RequestStatus.Loading;
    });
    builder.addCase(feedThunk.fulfilled, (state, action) => {
      state.status = RequestStatus.Success;
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    });
    builder.addCase(feedThunk.rejected, (state) => {
      state.status = RequestStatus.Failed;
    });
  }
});

export const feedSelectors = feedSlice.selectors;
export const feedActions = feedSlice.actions;
export const feedReducer = feedSlice.reducer;
