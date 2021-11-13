import React, { FC, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Product from '../components/Product';
import { useAppDispatch, useTypedSelector } from '../hooks';
import { fetchProducts } from '../store/features/products/products.thunk';

const HomePage: FC = () => {
  const { products } = useTypedSelector((state) => state.products);

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
    </>
  );
};

export default HomePage;
