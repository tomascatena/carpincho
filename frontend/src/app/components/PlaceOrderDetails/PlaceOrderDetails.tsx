import React, { FC } from 'react';
import { Nullable, ShippingAddress, ICartItem } from '../../types/types';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import EmptyCartAlert from './EmptyCartAlert/EmptyCartAlert';
import CartItemsList from './CartItemsList/CartItemsList';

interface Props {
  cartItems: ICartItem[];
  shippingAddress: Nullable<ShippingAddress>;
  paymentMethod: Nullable<string>;
}

const PlaceOrderDetails: FC<Props> = ({
  cartItems,
  shippingAddress,
  paymentMethod,
}) => {
  return (
    <Card variant='outlined'>
      <CardContent>
        <Typography
          variant='h5'
          component='h1'
          sx={{ marginBottom: 1, marginTop: 1 }}
          color='text.primary'
        >
          Shipping Address
        </Typography>

        <Typography variant='h6' component='div' sx={{ my: 1 }}>
          Address: {shippingAddress?.address}, {shippingAddress?.city}{' '}
          {shippingAddress?.postalCode}, {shippingAddress?.country}
        </Typography>

        <Divider sx={{ marginBlock: 2 }} />

        <Typography
          variant='h5'
          component='h1'
          sx={{ marginBottom: 1, marginTop: 1 }}
          color='text.primary'
        >
          Payment Method
        </Typography>

        <Typography variant='h6' component='div' sx={{ my: 1 }}>
          Method: {paymentMethod}
        </Typography>

        <Divider sx={{ marginBlock: 2 }} />

        <Typography
          variant='h5'
          component='h1'
          sx={{ marginBottom: 1, marginTop: 1 }}
          color='text.primary'
        >
          Order Items
        </Typography>

        {cartItems.length === 0 ? (
          <EmptyCartAlert />
        ) : (
          <CartItemsList cartItems={cartItems} />
        )}
      </CardContent>
    </Card>
  );
};

export default PlaceOrderDetails;
