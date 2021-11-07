import React, { FC } from 'react';
import products from '../products';
import Grid from '@mui/material/Grid';
import Product from '../components/Product';

const HomePage: FC = () => {
  return (
    <>
      <h1>Latest Products</h1>

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
