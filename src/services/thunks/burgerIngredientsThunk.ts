import { createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';


export const fetchBurgerIngredients = createAsyncThunk(
  'ingredients/fetchBurgerIngredients',
  getIngredientsApi
);
