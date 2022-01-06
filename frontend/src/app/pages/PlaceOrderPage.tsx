import React, { FC } from 'react';
import { useTypedSelector } from '../hooks';
import CheckoutSteps from '../components/CheckoutSteps/CheckoutSteps';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import PlaceOrderDetails from '../components/PlaceOrderDetails/PlaceOrderDetails';
import PlaceOrderSummary from '../components/PlaceOrderSummary/PlaceOrderSummary';

const PlaceOrderPage: FC = () => {
  const {
    cartItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = useTypedSelector((state) => state.cart);

  return (
    <>
      <Container maxWidth='sm'>
        <CheckoutSteps />
      </Container>

      <Typography
        variant='h3'
        component='h1'
        sx={{ marginBottom: 5, marginTop: 3 }}
        color='text.primary'
      >
        Place Order
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <PlaceOrderDetails
            cartItems={cartItems}
            shippingAddress={shippingAddress}
            paymentMethod={paymentMethod}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <PlaceOrderSummary
            cartItems={cartItems}
            itemsPrice={itemsPrice}
            taxPrice={taxPrice}
            shippingPrice={shippingPrice}
            totalPrice={totalPrice}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default PlaceOrderPage;
