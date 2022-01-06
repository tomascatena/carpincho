import React, { FC } from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { ICartItem } from '../../../types/types';
import Grid from '@mui/material/Grid';
import { formatEUR } from '../../../utils/numberFormatter';
import { useNavigate } from 'react-router-dom';

interface Props {
  cartItems: ICartItem[];
}

const CartItemsList: FC<Props> = ({ cartItems }) => {
  const navigate = useNavigate();

  return (
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
  );
};

export default CartItemsList;
