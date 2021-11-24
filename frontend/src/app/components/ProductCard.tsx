import React, { FC } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import { IProduct } from '../types/types';
import { useNavigate } from 'react-router-dom';

interface Props {
  product: IProduct;
}

const Product: FC<Props> = ({ product }) => {
  const navigate = useNavigate();

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea onClick={() => navigate(`/product/${product._id}`)}>
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
            defaultValue={product.averageRating}
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
    </Card>
  );
};

export default Product;
