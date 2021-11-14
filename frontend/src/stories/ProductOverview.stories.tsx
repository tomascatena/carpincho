import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ProductOverview from '../app/components/ProductOverview';

export default {
  title: 'Carpincho/Product-Overview',
  component: ProductOverview,
} as ComponentMeta<typeof ProductOverview>;

const Template: ComponentStory<typeof ProductOverview> = (args) => (
  <ProductOverview productDetails={args.productDetails} />
);

export const ProductOverviewStory = Template.bind({});
ProductOverviewStory.args = {
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
