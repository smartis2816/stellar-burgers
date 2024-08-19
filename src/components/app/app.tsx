import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

import { AppHeader, Modal, OrderInfo, ProtectedRoute, IngredientDetails } from '@components';
import { useDispatch } from "../../services/store";
import { useEffect } from 'react';
import { fetchBurgerIngredients } from '../../services/thunks/burgerIngredientsThunk';
import { getUserThunk } from '../../services/thunks/userThunk';
import { userActions } from '../../services/slices/userSlice';



const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const backgroundLocation = location.state?.backgroundLocation;
  const dispatch = useDispatch();

  const handleModalClose = () => navigate(-1);

  useEffect(() => {
    dispatch(fetchBurgerIngredients());
    dispatch(getUserThunk()).unwrap().finally(() => {
      dispatch(userActions.authChecked());
    });
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={backgroundLocation || location}>
        <Route path={'/'} element={<ConstructorPage />} />
        <Route path={'/feed'} element={<Feed />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route path='/feed/:number' element={<OrderInfo />} />
        <Route
          path='/profile/orders/:number'
          element={
            <ProtectedRoute>
              <OrderInfo />
            </ProtectedRoute>
          }
        />
        <Route
          path={'/login'}
          element={
          <ProtectedRoute onlyUnAuth>
            <Login />
          </ProtectedRoute>
          }
        />
        <Route
          path={'/register'}
          element={
            <ProtectedRoute onlyUnAuth>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path={'/forgot-password'}
          element={
            <ProtectedRoute onlyUnAuth>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path={'/reset-password'}
          element={
            <ProtectedRoute onlyUnAuth>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path={'/profile'}
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path={'/profile/orders'}
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route path='*' element={<NotFound404 />} />
      </Routes>
      {backgroundLocation && (
        <Routes>
          <Route
            path={'/feed/:number'}
            element={
              <Modal onClose={handleModalClose} title={'OrderInfo'} >
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path={'/ingredients/:id'}
            element={
              <Modal onClose={handleModalClose} title={'IngredientDetails'} >
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path={'/profile/orders/:number'}
            element={
              <ProtectedRoute>
                <Modal onClose={handleModalClose} title={'OrderInfo'} >
                  <OrderInfo />
                </Modal>
              </ProtectedRoute>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
