import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from '../../services/store';
import { useParams } from 'react-router-dom';
import { burgerIngredientsSelectors } from '../../services/slices/burgerIngredientsSlice';

export const IngredientDetails: FC = () => {
  /** TODO: взять переменную из стора */
  const params = useParams();
  const ingredientId = params.id;
  const ingredientData = useSelector((state) =>
    ingredientId
      ? burgerIngredientsSelectors.selectIngredientById(state, ingredientId)
      : null
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
