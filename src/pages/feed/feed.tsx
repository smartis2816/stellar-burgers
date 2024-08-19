import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { feedSelectors } from '../../services/slices/feedSlice';
import { feedThunk } from '../../services/thunks/feedThunk';


export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useSelector(feedSelectors.selectOrders);
  const dispatch = useDispatch();

  const handleGetFeeds = () => dispatch(feedThunk());

  useEffect(() => {
    handleGetFeeds();
  }, [handleGetFeeds]);

  if (!orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
