import React, { FC } from 'react';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import { ICartItem } from '../../types/types';
import Link from '@mui/material/Link';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import { useActions } from '../../hooks';
import { useNavigate } from 'react-router-dom';

interface Props {
  cartItems: ICartItem[];
}

const CartItemsList: FC<Props> = ({ cartItems }) => {
  const navigate = useNavigate();

  const { removeCartItem, setCartItemQuantity } = useActions();

  const handleQuantityChange = (
    event: SelectChangeEvent,
    productId: string
  ) => {
    setCartItemQuantity({ productId, quantity: parseInt(event.target.value) });
  };

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
            >
              <Grid
                item
                xs={2}
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

              <Grid item xs={5}>
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

              <Grid item xs={2}>
                <Typography
                  variant='h6'
                  component='p'
                  color='text.primary'
                  align='right'
                >
                  ${item.price}
                </Typography>
              </Grid>

              <Grid item xs={3} textAlign='right'>
                <FormControl variant='standard' sx={{ minWidth: '100%' }}>
                  <Box
                    sx={{
                      display: 'flex',
                      my: 1,
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                      gap: 2,
                    }}
                  >
                    <Select
                      sx={{ flex: 0.5 }}
                      value={String(item.quantity)}
                      onChange={(e) => handleQuantityChange(e, item.product)}
                    >
                      {Array.from(
                        { length: item.countInStock },
                        (_, i) => i + 1
                      ).map((qty) => {
                        return (
                          <MenuItem key={qty} value={qty}>
                            {qty}
                          </MenuItem>
                        );
                      })}
                    </Select>

                    <IconButton
                      aria-label='delete'
                      onClick={() => removeCartItem(item.product)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </FormControl>
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
