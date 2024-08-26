import { RequestStatus, TIngredient } from '@utils-types';
import { createSlice } from '@reduxjs/toolkit';
import { fetchBurgerIngredients } from '../thunks/burgerIngredientsThunk';

export interface TBurgerIngredientsState {
  ingredients: Array<TIngredient> | [];
  status: RequestStatus;
}

export const initialState: TBurgerIngredientsState = {
  ingredients: [],
  status: RequestStatus.Idle
};

export const burgerIngredientsSlice = createSlice({
  name: 'burgerIngredients',
  initialState,
  reducers: {},
  selectors: {
    selectBurgerIngredients: (state) => state.ingredients,
    selectIngredientById: (state, id) =>
      state.ingredients.find((ingredient) => ingredient._id === id),
    selectBurgerIngredientsStatus: (state) => state.status
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBurgerIngredients.pending, (state) => {
      state.status = RequestStatus.Loading;
    });
    builder.addCase(fetchBurgerIngredients.fulfilled, (state, action) => {
      state.ingredients = action.payload;
      state.status = RequestStatus.Success;
    });
    builder.addCase(fetchBurgerIngredients.rejected, (state) => {
      state.status = RequestStatus.Failed;
    });
  }
});

export const burgerIngredientsSelectors = burgerIngredientsSlice.selectors;
export const burgerIngredientsReducer = burgerIngredientsSlice.reducer;
