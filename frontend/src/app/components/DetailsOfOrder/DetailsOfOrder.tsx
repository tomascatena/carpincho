import React, { FC } from 'react';
import { OrderDetails } from '../../types/types';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import EmptyCartAlert from './EmptyCartAlert/EmptyCartAlert';
import OrderItemsList from './OrderItemsList/OrdertemsList';

interface Props {
  orderDetails: OrderDetails;
}

const DetailsOfOrder: FC<Props> = ({ orderDetails }) => {
  const {
    shippingAddress,
    paymentMethod,
    orderItems,
    user,
    isPaid,
    isDelivered,
    paidAt,
    deliveredAt,
  } = orderDetails;

  return (
    <Card variant='outlined'>
      <CardContent>
        <Typography
          variant='h5'
          component='h1'
          sx={{ marginBottom: 1, marginTop: 1 }}
          color='text.primary'
        >
          Shipping Details
        </Typography>

        <Typography variant='h6' component='div' sx={{ my: 1 }}>
          Address: {shippingAddress?.address}, {shippingAddress?.city}{' '}
          {shippingAddress?.postalCode}, {shippingAddress?.country}
        </Typography>

        <Typography variant='h6' component='div' sx={{ my: 1 }}>
          Name: {user.name}
        </Typography>

        <Typography variant='h6' component='div' sx={{ my: 1 }}>
          Email: {user.email}
        </Typography>

        <Typography
          variant='h6'
          component='div'
          sx={{ my: 1, mb: 2, width: 'fit-content' }}
        >
          <Alert severity={isDelivered ? 'success' : 'info'} variant='outlined'>
            {isDelivered ? `Delivered on: ${deliveredAt}` : 'Not Delivered'}
          </Alert>
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

        <Typography
          variant='h6'
          component='div'
          sx={{ my: 1, mb: 2, width: 'fit-content' }}
        >
          <Alert severity={isPaid ? 'success' : 'warning'} variant='outlined'>
            {isPaid ? `Paid on: ${paidAt}` : 'Not Paid'}
          </Alert>
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

        {orderItems.length === 0 ? (
          <EmptyCartAlert />
        ) : (
          <OrderItemsList orderItems={orderItems} />
        )}
      </CardContent>
    </Card>
  );
};

export default DetailsOfOrder;
