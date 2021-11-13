import React, { FC, useEffect } from 'react';
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
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { useTypedSelector, useAppDispatch } from '../hooks';
import { fetchProductById } from '../store/features/productDetails/productDetails.thunk';

const ProductPage: FC = () => {
  const { productId } = useParams();

  const { productDetails, loading, error } = useTypedSelector(
    (state) => state.productDetails
  );

  const dispatch = useAppDispatch();

  const fetchAllProducts = async () => {
    try {
      if (productId) {
        await dispatch(fetchProductById(productId));
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <>
      <Link to='/' style={{ textDecoration: 'none' }}>
        <Button variant='outlined'>Go Back</Button>
      </Link>

      <Box sx={{ marginTop: 2 }}>
        {loading === 'pending' ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '50vh',
            }}
          >
            <CircularProgress
              variant='indeterminate'
              disableShrink
              sx={{
                color: (theme) =>
                  theme.palette.mode === 'light'
                    ? theme.palette.primary.dark
                    : theme.palette.primary.light,
                animationDuration: '550ms',
              }}
              size={60}
              thickness={4}
            />
          </Box>
        ) : error ? (
          <Alert severity='error' variant='filled'>
            <AlertTitle>Error</AlertTitle>
            {error.message}
          </Alert>
        ) : (
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            <Grid item xs={4} sm={4} md={5}>
              <CardMedia
                image={productDetails?.image}
                title={productDetails?.name}
                component='img'
              />
            </Grid>

            <Grid item xs={4} sm={2} md={4}>
              <List>
                <ListItem>
                  <Typography variant='h5' component='h3' color='text.primary'>
                    {productDetails?.name}
                  </Typography>
                </ListItem>

                <ListItem>
                  <Box sx={{ display: 'flex', gap: '0.3rem' }}>
                    <Rating
                      name='product-rating'
                      defaultValue={productDetails?.averageRating}
                      precision={0.5}
                      size='small'
                      readOnly
                    />
                    <Typography variant='body2' color='text.secondary'>
                      {productDetails?.numReviews} reviews
                    </Typography>
                  </Box>
                </ListItem>

                <ListItem>
                  <Typography variant='h6' component='h3' color='text.primary'>
                    ${productDetails?.price}
                  </Typography>
                </ListItem>

                <ListItem>
                  <Typography
                    variant='body1'
                    component='h3'
                    color='text.secondary'
                  >
                    {productDetails?.description}
                  </Typography>
                </ListItem>
              </List>
            </Grid>

            <Grid item xs={4} sm={2} md={3}>
              <Card variant='outlined'>
                <CardContent>
                  <Typography variant='h6' component='div' sx={{ my: 1 }}>
                    Price: ${productDetails?.price}
                  </Typography>

                  <Divider />

                  <Typography variant='body1' component='div' sx={{ my: 1 }}>
                    Status:{' '}
                    {productDetails && productDetails?.countInStock > 0
                      ? 'In Stock'
                      : 'Out of stock'}
                  </Typography>
                </CardContent>

                <CardActions>
                  <Button
                    variant='contained'
                    fullWidth
                    disabled={productDetails?.countInStock === 0}
                  >
                    Add To Cart
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        )}
      </Box>
    </>
  );
};

export default ProductPage;
