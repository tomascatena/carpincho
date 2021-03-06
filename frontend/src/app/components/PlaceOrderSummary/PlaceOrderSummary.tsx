import React, { FC } from 'react';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import { ICartItem, Nullable } from '../../types/types';
import { formatEUR, percentFormatter } from '../../utils/numberFormatter';
import { TAX_RATE } from '../../constants/constants';

interface Props {
  cartItems: ICartItem[];
  itemsPrice: Nullable<number>;
  taxPrice: Nullable<number>;
  shippingPrice: Nullable<number>;
  totalPrice: Nullable<number>;
  dispatchCreateOrder: () => void;
  loading: 'idle' | 'pending';
}

const PlaceOrderSummary: FC<Props> = ({
  cartItems,
  itemsPrice,
  taxPrice,
  shippingPrice,
  totalPrice,
  dispatchCreateOrder,
  loading,
}) => {
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
          <span>Items</span> {itemsPrice !== null && formatEUR(itemsPrice)}
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
          <span>Shipping</span>{' '}
          {shippingPrice !== null && formatEUR(shippingPrice)}
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
          {taxPrice !== null && formatEUR(taxPrice)}
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
          <span>Total</span> {totalPrice !== null && formatEUR(totalPrice)}
        </Typography>
      </CardContent>

      <CardActions>
        <Button
          sx={{ margin: 1 }}
          disabled={cartItems.length === 0 || loading === 'pending'}
          onClick={() => dispatchCreateOrder()}
          variant='contained'
          color='primary'
          fullWidth
        >
          Place Order
        </Button>
      </CardActions>
    </Card>
  );
};

export default PlaceOrderSummary;
