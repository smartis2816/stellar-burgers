import {combineReducers} from "@reduxjs/toolkit";
import {burgerIngredientsReducer, burgerIngredientsSlice} from "./slices/burgerIngredientsSlice";
import {orderReducer, orderSlice} from "./slices/orderSlice";
import {ordersReducer, ordersSlice} from "./slices/ordersSlice";
import { userReducer, userSlice } from './slices/userSlice';
import { burgerConstructorReducer, burgerConstructorSlice } from './slices/burgerConstructorSlice';
import { feedReducer, feedSlice } from './slices/feedSlice';


export const RootReducer = combineReducers({
  [burgerIngredientsSlice.name]: burgerIngredientsReducer,
  [orderSlice.name]: orderReducer,
  [ordersSlice.name]: ordersReducer,
  [userSlice.name]: userReducer,
  [burgerConstructorSlice.name]: burgerConstructorReducer,
  [feedSlice.name]: feedReducer,
});

