import React, { FC } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Rating from '@mui/material/Rating';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { IProduct } from '../../types/types';

interface Props {
  productDetails: IProduct;
}

const ProductDetails: FC<Props> = ({ productDetails }) => {
  return (
    <>
      <Grid item xs={4} sm={4} md={5}>
        <CardMedia
          image={productDetails.image}
          title={productDetails.name}
          component='img'
        />
      </Grid>

      <Grid item xs={4} sm={2} md={4}>
        <List>
          <ListItem>
            <Typography variant='h5' component='h3' color='text.primary'>
              {productDetails.name}
            </Typography>
          </ListItem>

          <ListItem>
            <Box sx={{ display: 'flex', gap: '0.3rem' }}>
              <Rating
                name='product-rating'
                defaultValue={productDetails.averageRating}
                precision={0.5}
                size='small'
                readOnly
              />
              <Typography variant='body2' color='text.secondary'>
                {productDetails.numReviews} reviews
              </Typography>
            </Box>
          </ListItem>

          <ListItem>
            <Typography variant='h6' component='h3' color='text.primary'>
              ${productDetails.price}
            </Typography>
          </ListItem>

          <ListItem>
            <Typography variant='body1' component='h3' color='text.secondary'>
              {productDetails.description}
            </Typography>
          </ListItem>
        </List>
      </Grid>
    </>
  );
};

export default ProductDetails;
