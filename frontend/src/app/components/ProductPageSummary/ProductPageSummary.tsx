import React, { FC } from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Card from '@mui/material/Card';

import { IProduct } from '../../types/types';

interface Props {
  productDetails: IProduct;
  quantity: number;
  handleQuantityChange: (event: SelectChangeEvent) => void;
  addToCartHandler: () => void;
}

const ProductPageSummary: FC<Props> = ({
  productDetails,
  quantity,
  handleQuantityChange,
  addToCartHandler,
}) => {
  return (
    <>
      <Grid item xs={4} sm={2} md={3}>
        <Card variant='outlined'>
          <CardContent>
            <Typography variant='h6' component='div' sx={{ my: 1 }}>
              Price: ${(productDetails.price * quantity).toFixed(2)}
            </Typography>

            <Divider />

            <Typography variant='body1' component='div' sx={{ my: 1 }}>
              Status:{' '}
              {productDetails.countInStock > 0 ? 'In Stock' : 'Out of stock'}
            </Typography>

            <Divider />

            {productDetails.countInStock > 0 && (
              <FormControl variant='standard' sx={{ minWidth: '100%' }}>
                <Box
                  sx={{
                    display: 'flex',
                    my: 1,
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  <Typography variant='body1' component='div'>
                    Quantity:
                  </Typography>

                  <Select
                    sx={{ flex: 0.5 }}
                    value={String(quantity)}
                    onChange={handleQuantityChange}
                  >
                    {Array.from(
                      { length: productDetails.countInStock },
                      (_, i) => i + 1
                    ).map((qty) => {
                      return (
                        <MenuItem key={qty} value={qty}>
                          {qty}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </Box>
              </FormControl>
            )}
          </CardContent>

          <CardActions>
            <Button
              variant='contained'
              fullWidth
              disabled={productDetails.countInStock === 0}
              onClick={addToCartHandler}
            >
              Add To Cart
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </>
  );
};

export default ProductPageSummary;
