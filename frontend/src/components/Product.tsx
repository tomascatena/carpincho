import React, { FC } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import { IProduct } from '../types/types';

interface Props {
  product: IProduct;
}

const Product: FC<Props> = ({ product }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea onClick={() => console.log('go to product page')}>
        <CardMedia
          component='img'
          alt={product.description}
          height='auto'
          image={product.image}
        />
      </CardActionArea>

      <CardContent>
        <Typography gutterBottom variant='h5' component='div'>
          {product.name}
        </Typography>

        <Box sx={{ display: 'flex', gap: '0.3rem' }}>
          <Rating
            name='product-rating'
            defaultValue={product.rating}
            precision={0.5}
            size='small'
            readOnly
          />
          <Typography variant='body2' color='text.secondary'>
            {product.numReviews} reviews
          </Typography>
        </Box>

        <Typography variant='h5' color='text.secondary'>
          ${product.price}
        </Typography>

        <Typography variant='body2' color='text.secondary'>
          {product.description}
        </Typography>
      </CardContent>

      <CardActions>
        <Button size='small'>Share</Button>

        <Button size='small'>Learn More</Button>
      </CardActions>
    </Card>
  );
};

export default Product;
