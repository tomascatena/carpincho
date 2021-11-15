import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Grid from '@mui/material/Grid';

import ProductPageSummary from '../app/components/ProductPageSummary';

export default {
  title: 'Carpincho/Product-Page-Summary',
  component: ProductPageSummary,
} as ComponentMeta<typeof ProductPageSummary>;

const Template: ComponentStory<typeof ProductPageSummary> = (args) => (
  <Grid
    sx={{ minWidth: '100vw' }}
    container
    spacing={{ xs: 2, md: 3 }}
    columns={{ xs: 4, sm: 8, md: 12 }}
  >
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
      }}
    >
      <ProductPageSummary {...args} />
    </div>
  </Grid>
);

export const ProductInStock = Template.bind({});
ProductInStock.args = {
  handleQuantityChange: () => true,
  addToCartHandler: () => true,
  quantity: 3,
  productDetails: {
    _id: '618fe92e90189ff214377a84',
    name: 'Cannon EOS 80D DSLR Camera',
    image: '/images/camera.jpg',
    brand: 'Cannon',
    category: 'Electronics',
    description:
      'Characterized by versatile imaging specs, the Canon EOS 80D further clarifies itself using a pair of robust focusing systems and an intuitive design',
    averageRating: 4.3,
    numReviews: 12,
    price: 929.99,
    countInStock: 5,
    reviews: [],
  },
};

export const ProductOutOfStock = Template.bind({});
ProductOutOfStock.args = {
  handleQuantityChange: () => true,
  addToCartHandler: () => true,
  quantity: 3,
  productDetails: {
    _id: '618fe92e90189ff214377a84',
    name: 'Cannon EOS 80D DSLR Camera',
    image: '/images/camera.jpg',
    brand: 'Cannon',
    category: 'Electronics',
    description:
      'Characterized by versatile imaging specs, the Canon EOS 80D further clarifies itself using a pair of robust focusing systems and an intuitive design',
    averageRating: 4.3,
    numReviews: 12,
    price: 929.99,
    countInStock: 0,
    reviews: [],
  },
};
