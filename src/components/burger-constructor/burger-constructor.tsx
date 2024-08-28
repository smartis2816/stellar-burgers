import { FC, useMemo } from 'react';
import { TConstructorIngredient, TUser } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { orderBurger } from '../../services/thunks/orderThunk';
import { userSelectors } from '../../services/slices/userSlice';
import {
  burgerConstructorActions,
  burgerConstructorSelectors
} from '../../services/slices/burgerConstructorSlice';
import { orderActions, orderSelectors } from '../../services/slices/orderSlice';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user: TUser | null = useSelector(userSelectors.selectUser);
  const constructorItems = useSelector(
    burgerConstructorSelectors.selectBurgerConstructor
  );
  const orderRequest =
    useSelector(orderSelectors.selectOrderStatus) === 'Loading';
  const orderModalData = useSelector(orderSelectors.selectOrderData);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!user) {
      navigate('/login');
      return;
    }
    dispatch(
      orderBurger([
        constructorItems.bun._id,
        ...constructorItems.ingredients.map(
          (item: TConstructorIngredient) => item._id
        ),
        constructorItems.bun._id
      ])
    );
  };

  const closeOrderModal = () => {
    dispatch(burgerConstructorActions.resetIngredients());
    dispatch(orderActions.reloadOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
