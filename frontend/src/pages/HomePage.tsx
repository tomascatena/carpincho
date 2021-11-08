import React, { FC, useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Product from '../components/Product';
import { IProduct } from '../types/types';
import axios from 'axios';

const HomePage: FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get('/api/v1/products');

      setProducts(data.products);
    };

    fetchProducts();
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
