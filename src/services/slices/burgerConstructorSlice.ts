import { TConstructorIngredient, TIngredient } from '@utils-types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TBurgerConstructorState{
  bun: TConstructorIngredient | null,
  ingredients: TConstructorIngredient[]
}

export const initialState: TBurgerConstructorState = {
  bun: null,
  ingredients: []
}

const uuid = () => crypto.randomUUID();

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, { payload }: PayloadAction<TConstructorIngredient>) => {
        if (payload.type === 'bun') {
          state.bun = payload;
        } else {
          state.ingredients.push(payload);
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: uuid() }
      })
    },
    removeIngredient: (state, { payload }: PayloadAction<number>) => {
      state.ingredients.splice(payload, 1);
    },
    moveDown: (state, { payload }: PayloadAction<number>) => {
      if (payload < state.ingredients.length - 1){
        [state.ingredients[payload + 1], state.ingredients[payload]] = [
          state.ingredients[payload], state.ingredients[payload + 1]
        ];
      }
    },
    moveUp: (state, { payload }: PayloadAction<number>) => {
      if (payload > 0){
        [state.ingredients[payload - 1], state.ingredients[payload]] = [
          state.ingredients[payload], state.ingredients[payload - 1]
        ];
      }
    },
    resetIngredients: (state) => {
      state.ingredients = [];
      state.bun = null;
    }
  },
  selectors: {
    selectBurgerConstructor: (state) => state,
  }
});

export  const burgerConstructorReducer = burgerConstructorSlice.reducer;
export const burgerConstructorSelectors = burgerConstructorSlice.selectors;
export const burgerConstructorActions = burgerConstructorSlice.actions;
