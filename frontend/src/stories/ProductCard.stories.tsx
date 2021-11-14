import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ProductCard from '../app/components/ProductCard';

export default {
  title: 'Carpincho/Product-Card',
  component: ProductCard,
} as ComponentMeta<typeof ProductCard>;

const Template: ComponentStory<typeof ProductCard> = (args) => (
  <ProductCard product={args.product} />
);

export const ProductCardStory = Template.bind({});
ProductCardStory.args = {
  product: {
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
