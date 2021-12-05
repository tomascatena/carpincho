import React, { FC, useState } from 'react';
import Footer from './app/components/Footer';
import Header from './app/components/Header';
import { styled } from '@mui/system';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import HomePage from './app/pages/HomePage';
import { ThemeProvider } from '@mui/material/styles';
import defaultTheme from './app/themes/defaultTheme';
import defaultDarkTheme from './app/themes/defaultDarkTheme';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductPage from './app/pages/ProductPage';
import CartPage from './app/pages/CartPage';
import LoginPage from './app/pages/LoginPage';
import RegisterPage from './app/pages/RegisterPage';
import UserProfilePage from './app/pages/UserProfilePage';
import ShippingPage from './app/pages/ShippingPage';
import PaymentMethodsPage from './app/pages/PaymentMethodsPage';
import { ROUTES } from './app/constants/constants';
import PlaceOrderPage from './app/pages/PlaceOrderPage';

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
              <Route path='/' element={<HomePage />} />

              <Route
                path={`${ROUTES.PRODUCT}/:productId`}
                element={<ProductPage />}
              />

              <Route path={ROUTES.LOGIN} element={<LoginPage />} />

              <Route path={ROUTES.REGISTER} element={<RegisterPage />} />

              <Route path={ROUTES.PROFILE} element={<UserProfilePage />} />

              <Route
                path={ROUTES.SHIPPING_ADDRESS}
                element={<ShippingPage />}
              />

              <Route
                path={ROUTES.PAYLMENT_METHOD}
                element={<PaymentMethodsPage />}
              />

              <Route path={ROUTES.PLACE_ORDER} element={<PlaceOrderPage />} />

              <Route path={ROUTES.CART}>
                <Route path=':productId' element={<CartPage />} />
                <Route path='' element={<CartPage />} />
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
