import React, { FC, useState, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { styled } from '@mui/system';
import { ROUTES } from './app/constants/constants';
import { ThemeProvider } from '@mui/material/styles';
import Footer from './app/components/Footer';
import Header from './app/components/Header';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import defaultTheme from './app/themes/defaultTheme';
import defaultDarkTheme from './app/themes/defaultDarkTheme';

const HomePage = lazy(() => import('./app/pages/HomePage'));
const CartPage = lazy(() => import('./app/pages/CartPage'));
const LoginPage = lazy(() => import('./app/pages/LoginPage'));
const ProductPage = lazy(() => import('./app/pages/ProductPage'));
const ShippingPage = lazy(() => import('./app/pages/ShippingPage'));
const RegisterPage = lazy(() => import('./app/pages/RegisterPage'));
const PlaceOrderPage = lazy(() => import('./app/pages/PlaceOrderPage'));
const UserProfilePage = lazy(() => import('./app/pages/UserProfilePage'));
const PaymentMethodsPage = lazy(() => import('./app/pages/PaymentMethodsPage'));

const SuspenseHomePage = () => {
  return (
    <Suspense fallback='loading...'>
      <HomePage />
    </Suspense>
  );
};

const SuspenseCartPage = () => {
  return (
    <Suspense fallback='loading...'>
      <CartPage />
    </Suspense>
  );
};

const SuspenseLoginPage = () => {
  return (
    <Suspense fallback='loading...'>
      <LoginPage />
    </Suspense>
  );
};

const SuspenseProductPage = () => {
  return (
    <Suspense fallback='loading...'>
      <ProductPage />
    </Suspense>
  );
};

const SuspenseShippingPage = () => {
  return (
    <Suspense fallback='loading...'>
      <ShippingPage />
    </Suspense>
  );
};

const SuspenseRegisterPage = () => {
  return (
    <Suspense fallback='loading...'>
      <RegisterPage />
    </Suspense>
  );
};

const SuspensePlaceOrderPage = () => {
  return (
    <Suspense fallback='loading...'>
      <PlaceOrderPage />
    </Suspense>
  );
};

const SuspenseUserProfilePage = () => {
  return (
    <Suspense fallback='loading...'>
      <UserProfilePage />
    </Suspense>
  );
};

const SuspensePaymentMethodsPage = () => {
  return (
    <Suspense fallback='loading...'>
      <PaymentMethodsPage />
    </Suspense>
  );
};

const MainLayout = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  color: theme.palette.primary.main,
  backgroundColor: theme.palette.background.paper,
  display: 'flex',
  flexDirection: 'column',
}));

const MainContainer = styled(Container)(({ theme }) => ({
  flex: 1,
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(4),
}));

const App: FC = () => {
  const [darkTheme, setDarkTheme] = useState<boolean>(true);

  return (
    <BrowserRouter>
      <ThemeProvider theme={darkTheme ? defaultDarkTheme : defaultTheme}>
        <MainLayout>
          <Header setDarkTheme={setDarkTheme} darkTheme={darkTheme} />

          <MainContainer>
            <Routes>
              <Route path='/' element={<SuspenseHomePage />} />

              <Route
                path={`${ROUTES.PRODUCT}/:productId`}
                element={<SuspenseProductPage />}
              />

              <Route path={ROUTES.LOGIN} element={<SuspenseLoginPage />} />

              <Route
                path={ROUTES.REGISTER}
                element={<SuspenseRegisterPage />}
              />

              <Route
                path={ROUTES.PROFILE}
                element={<SuspenseUserProfilePage />}
              />

              <Route
                path={ROUTES.SHIPPING_ADDRESS}
                element={<SuspenseShippingPage />}
              />

              <Route
                path={ROUTES.PAYLMENT_METHOD}
                element={<SuspensePaymentMethodsPage />}
              />

              <Route
                path={ROUTES.PLACE_ORDER}
                element={<SuspensePlaceOrderPage />}
              />

              <Route path={ROUTES.CART}>
                <Route path=':productId' element={<SuspenseCartPage />} />
                <Route path='' element={<SuspenseCartPage />} />
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
