import React, { FC, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Product from '../components/Product';
import { useAppDispatch, useTypedSelector } from '../hooks';
import { fetchProducts } from '../store/features/products/products.thunk';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Box from '@mui/material/Box';

const HomePage: FC = () => {
  const { products, loading, error } = useTypedSelector(
    (state) => state.products
  );

  const dispatch = useAppDispatch();

  const fetchAllProducts = async () => {
    try {
      await dispatch(fetchProducts());
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <>
      <Typography
        variant='h3'
        component='h2'
        sx={{ marginBottom: '1rem' }}
        color='text.primary'
      >
        Latest Products
      </Typography>

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
        <Alert severity='error' variant='filled' sx={{ margin: '0 4' }}>
          <AlertTitle>Error</AlertTitle>
          {error.message}
        </Alert>
      ) : (
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {products.map((product) => {
            return (
              <Grid item xs={4} sm={4} md={4} key={product._id}>
                <Product product={product} />
              </Grid>
            );
          })}
        </Grid>
      )}
    </>
  );
};

export default HomePage;
