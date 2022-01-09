import React, { FC, useEffect } from 'react';
import { useAppDispatch, useTypedSelector, useActions } from '../hooks';
import CheckoutSteps from '../components/CheckoutSteps/CheckoutSteps';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import PlaceOrderDetails from '../components/PlaceOrderDetails/PlaceOrderDetails';
import PlaceOrderSummary from '../components/PlaceOrderSummary/PlaceOrderSummary';
import { createOrder } from '../store/features/order/order.thunk';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants/constants';

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

  const { placedOrder, loading } = useTypedSelector((state) => state.order);

  const { user } = useTypedSelector((state) => state.user);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { removeCartItem } = useActions();

  useEffect(() => {
    if (user && placedOrder) {
      navigate(`/order/${placedOrder._id}`);
    } else if (!user) {
      navigate(ROUTES.LOGIN);
    }
  }, [placedOrder, user]);

  const dispatchCreateOrder = () => {
    cartItems.forEach((item) => removeCartItem(item.product));

    if (
      shippingAddress !== null &&
      paymentMethod !== null &&
      itemsPrice !== null &&
      taxPrice !== null &&
      shippingPrice !== null &&
      totalPrice !== null &&
      cartItems.length
    ) {
      dispatch(
        createOrder({
          orderItems: cartItems,
          shippingAddress,
          paymentMethod,
          itemsPrice,
          taxPrice,
          shippingPrice,
          totalPrice,
        })
      );
    }
  };

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
            dispatchCreateOrder={dispatchCreateOrder}
            loading={loading}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default PlaceOrderPage;
