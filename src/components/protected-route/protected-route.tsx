import React from 'react';
import { useSelector } from '../../services/store';
import { Navigate, useLocation } from 'react-router-dom';
import { userSelectors } from '../../services/slices/userSlice';
import { Preloader } from '@ui';


type ProtectedRouteProps = {
  onlyUnAuth?: boolean,
  children: React.ReactElement,
};

export const ProtectedRoute = ({ onlyUnAuth, children }: ProtectedRouteProps) => {
  const user = useSelector(userSelectors.selectUser);
  const isAuth = useSelector(userSelectors.isAuthCheckedSelector);
  const location = useLocation();

  if (!isAuth) {
    return <Preloader />;
  }

  if (onlyUnAuth && user) {
    const from  = location.state?.from || {pathname: '/'};
    const backgroundLocation = location.state?.from?.backgroundLocation || null;
    return <Navigate replace to={from} state={{ backgroundLocation }}/>;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate replace to={'/login'} state={{ from: {
        ...location,
        backgroundLocation: location.state?.backgroundLocation,
        state: null
      }}}/>;
  }

  return children;
}
