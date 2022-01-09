import React, { FC } from 'react';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import { OrderDetails } from '../../types/types';
import { formatEUR, percentFormatter } from '../../utils/numberFormatter';
import { TAX_RATE } from '../../constants/constants';

interface Props {
  orderDetails: OrderDetails;
  loading: 'idle' | 'pending';
}

const OrderSummary: FC<Props> = ({ orderDetails, loading }) => {
  const { orderItems, totalPrice, shippingPrice, taxPrice } = orderDetails;

  const isDefined = (num: number) => {
    if (num === null || num === undefined) {
      return 0;
    } else {
      return num;
    }
  };

  const itemsPrice = orderItems.reduce((accumulator, item) => {
    return (accumulator += item.quantity * item.price);
  }, 0);

  return (
    <Card>
      <CardContent>
        <Typography
          variant='h6'
          component='div'
          sx={{
            marginBottom: 1,
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <span>Items</span> {formatEUR(isDefined(itemsPrice))}
        </Typography>

        <Divider sx={{ marginBlock: 2 }} />

        <Typography
          variant='h6'
          component='div'
          sx={{
            marginBottom: 1,
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <span>Shipping</span> {formatEUR(isDefined(shippingPrice))}
        </Typography>

        <Divider sx={{ marginBlock: 2 }} />

        <Typography
          variant='h6'
          component='div'
          sx={{
            marginBottom: 1,
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <span>Tax ({percentFormatter(TAX_RATE)})</span>{' '}
          {formatEUR(isDefined(taxPrice))}
        </Typography>

        <Divider sx={{ marginBlock: 2 }} />

        <Typography
          variant='h6'
          component='div'
          sx={{
            marginBottom: 1,
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <span>Total</span> {formatEUR(isDefined(totalPrice))}
        </Typography>
      </CardContent>

      <CardActions>
        <Button
          sx={{ margin: 1 }}
          disabled={orderItems.length === 0 || loading === 'pending'}
          variant='contained'
          color='primary'
          fullWidth
        >
          Order
        </Button>
      </CardActions>
    </Card>
  );
};

export default OrderSummary;
