import React, { FC } from 'react';
import { Link, useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Rating from '@mui/material/Rating';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Divider from '@mui/material/Divider';
import { IProduct } from '../types/types';
import products from '../products';

const ProductPage: FC = () => {
  const params = useParams();

  const product = products.find((product) => product._id === params.productId);

  return (
    <>
      <Link to='/' style={{ textDecoration: 'none' }}>
        <Button variant='outlined'>Go Back</Button>
      </Link>

      <Box sx={{ marginTop: 2 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          <Grid item xs={4} sm={4} md={5}>
            <CardMedia
              image={product?.image}
              title={product?.name}
              component='img'
            />
          </Grid>

          <Grid item xs={4} sm={2} md={4}>
            <List>
              <ListItem>
                <Typography variant='h5' component='h3' color='text.primary'>
                  {product?.name}
                </Typography>
              </ListItem>

              <ListItem>
                <Box sx={{ display: 'flex', gap: '0.3rem' }}>
                  <Rating
                    name='product-rating'
                    defaultValue={product?.rating}
                    precision={0.5}
                    size='small'
                    readOnly
                  />
                  <Typography variant='body2' color='text.secondary'>
                    {product?.numReviews} reviews
                  </Typography>
                </Box>
              </ListItem>

              <ListItem>
                <Typography variant='h6' component='h3' color='text.primary'>
                  ${product?.price}
                </Typography>
              </ListItem>

              <ListItem>
                <Typography
                  variant='body1'
                  component='h3'
                  color='text.secondary'
                >
                  {product?.description}
                </Typography>
              </ListItem>
            </List>
          </Grid>

          <Grid item xs={4} sm={2} md={3}>
            <Card variant='outlined'>
              <CardContent>
                <Typography variant='h6' component='div' sx={{ my: 1 }}>
                  Price: ${product?.price}
                </Typography>

                <Divider />

                <Typography variant='body1' component='div' sx={{ my: 1 }}>
                  Status:{' '}
                  {product && product?.countInStock > 0
                    ? 'In Stock'
                    : 'Out of stock'}
                </Typography>
              </CardContent>

              <CardActions>
                <Button
                  variant='contained'
                  fullWidth
                  disabled={product?.countInStock === 0}
                >
                  Add To Cart
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ProductPage;
