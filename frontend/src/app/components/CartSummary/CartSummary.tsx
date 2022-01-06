import React, { FC } from 'react';
import { ICartItem } from '../../types/types';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/constants';

interface Props {
  cartItems: ICartItem[];
}

const CartSummary: FC<Props> = ({ cartItems }) => {
  const navigate = useNavigate();

  const checkoutHandler = () => {
    navigate(
      `${ROUTES.LOGIN}?redirect=${ROUTES.SHIPPING_ADDRESS.replace('/', '')}`
    );
  };

  return (
    <Card>
      <CardContent>
        <Typography variant='h5' component='div' sx={{ marginBottom: 1 }}>
          Subtotal (
          {cartItems.reduce(
            (previousValue, currentValue) =>
              previousValue + currentValue.quantity,
            0
          )}
          ) Items
        </Typography>

        <Typography variant='h5'>
          $
          {cartItems
            .reduce(
              (previousValue, currentValue) =>
                previousValue + currentValue.quantity * currentValue.price,
              0
            )
            .toFixed(2)}
        </Typography>
      </CardContent>

      <Divider variant='middle' />

      <CardActions>
        <Button
          sx={{ margin: 1 }}
          disabled={cartItems.length === 0}
          onClick={checkoutHandler}
          variant='contained'
          color='primary'
          fullWidth
        >
          Proceed to check out
        </Button>
      </CardActions>
    </Card>
  );
};

export default CartSummary;
