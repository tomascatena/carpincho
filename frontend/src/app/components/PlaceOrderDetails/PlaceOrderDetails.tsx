import React, { FC } from 'react';
import { Nullable, ShippingAddress, ICartItem } from '../../types/types';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import { formatEUR } from '../../utils/numberFormatter';

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
  const navigate = useNavigate();

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
          <Alert severity='info' variant='filled' sx={{ marginTop: 3 }}>
            <AlertTitle> Your cart is empty</AlertTitle>

            <Link
              component='button'
              onClick={() => navigate('/')}
              color='inherit'
              variant='body2'
            >
              See More Products
            </Link>
          </Alert>
        ) : (
          <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {cartItems.map((item) => {
              return (
                <div key={item.product}>
                  <Grid
                    display='flex'
                    justifyContent='center'
                    alignItems='center'
                    marginBottom={2}
                    marginTop={2}
                    container
                  >
                    <Grid
                      item
                      xs={4}
                      md={2}
                      display='flex'
                      justifyContent='center'
                      alignItems='center'
                    >
                      <ListItemAvatar>
                        <Avatar
                          alt={item.name}
                          src={item.image}
                          variant='square'
                          sx={{ width: 56, height: 56 }}
                        />
                      </ListItemAvatar>
                    </Grid>

                    <Grid item xs={8} md={5}>
                      <Link
                        component='button'
                        variant='h6'
                        color='text.primary'
                        underline='hover'
                        align='left'
                        onClick={() => navigate(`/product/${item.product}`)}
                      >
                        {item.name}
                      </Link>
                    </Grid>

                    <Grid item xs={12} md={5}>
                      <Typography
                        variant='h6'
                        component='p'
                        color='text.primary'
                        align='right'
                      >
                        {item.quantity} x {formatEUR(item.price)} ={' '}
                        {formatEUR(item.quantity * item.price)}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Divider />
                </div>
              );
            })}
          </List>
        )}
      </CardContent>
    </Card>
  );
};

export default PlaceOrderDetails;
