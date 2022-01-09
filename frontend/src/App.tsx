import React, { FC, useState, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ROUTES } from './app/constants/constants';
import { ThemeProvider } from '@mui/material/styles';
import Footer from './app/components/Footer/Footer';
import Header from './app/components/Header/Header';
import { MainLayout, MainContainer } from './App.styled';
import defaultTheme from './app/themes/defaultTheme';
import defaultDarkTheme from './app/themes/defaultDarkTheme';
import { SuspensePage } from './SuspensePage';

const HomePage = lazy(() => import('./app/pages/HomePage'));
const CartPage = lazy(() => import('./app/pages/CartPage'));
const OrderPage = lazy(() => import('./app/pages/OrderPage'));
const LoginPage = lazy(() => import('./app/pages/LoginPage'));
const ProductPage = lazy(() => import('./app/pages/ProductPage'));
const ShippingPage = lazy(() => import('./app/pages/ShippingPage'));
const RegisterPage = lazy(() => import('./app/pages/RegisterPage'));
const PlaceOrderPage = lazy(() => import('./app/pages/PlaceOrderPage'));
const UserProfilePage = lazy(() => import('./app/pages/UserProfilePage'));
const PaymentMethodsPage = lazy(() => import('./app/pages/PaymentMethodsPage'));

const App: FC = () => {
  const [darkTheme, setDarkTheme] = useState<boolean>(true);

  return (
    <BrowserRouter>
      <ThemeProvider theme={darkTheme ? defaultDarkTheme : defaultTheme}>
        <MainLayout>
          <Header setDarkTheme={setDarkTheme} darkTheme={darkTheme} />

          <MainContainer>
            <Routes>
              <Route path='/' element={<SuspensePage component={HomePage} />} />

              <Route
                path={`${ROUTES.PRODUCT}/:productId`}
                element={<SuspensePage component={ProductPage} />}
              />

              <Route
                path={ROUTES.LOGIN}
                element={<SuspensePage component={LoginPage} />}
              />

              <Route
                path={ROUTES.REGISTER}
                element={<SuspensePage component={RegisterPage} />}
              />

              <Route
                path={ROUTES.PROFILE}
                element={<SuspensePage component={UserProfilePage} />}
              />

              <Route
                path={ROUTES.SHIPPING_ADDRESS}
                element={<SuspensePage component={ShippingPage} />}
              />

              <Route
                path={ROUTES.PAYMENT_METHOD}
                element={<SuspensePage component={PaymentMethodsPage} />}
              />

              <Route
                path={ROUTES.PLACE_ORDER}
                element={<SuspensePage component={PlaceOrderPage} />}
              />

              <Route path={ROUTES.ORDER}>
                <Route
                  path=':orderId'
                  element={<SuspensePage component={OrderPage} />}
                />
              </Route>

              <Route path={ROUTES.CART}>
                <Route
                  path=':productId'
                  element={<SuspensePage component={CartPage} />}
                />

                <Route
                  path=''
                  element={<SuspensePage component={CartPage} />}
                />
              </Route>
            </Routes>
          </MainContainer>

          <Footer />
        </MainLayout>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
