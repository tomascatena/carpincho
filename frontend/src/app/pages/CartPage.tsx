import React, { useEffect, FC } from 'react';
import { useTypedSelector, useAppDispatch, useActions } from '../hooks';
import { fetchProductById } from '../store/features/productDetails/productDetails.thunk';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Link from '@mui/material/Link';
import CartItemsList from '../components/CartItemsList';
import CartSummary from '../components/CartSummary';

const CartPage: FC = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [searchParams] = useSearchParams();

  const qty = searchParams.get('qty');

  const { cartItems } = useTypedSelector((state) => state.cart);
  const { productDetails } = useTypedSelector((state) => state.productDetails);
  const { addCartItem } = useActions();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (productId) {
      dispatch(fetchProductById(productId));
    }

    if (productDetails && qty && parseInt(qty)) {
      addCartItem({ quantity: parseInt(qty), item: productDetails });
    }
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={8}>
        <Typography variant='h4'>Shopping Cart</Typography>
        {cartItems.length === 0 ? (
          <Alert severity='info' variant='filled' sx={{ marginTop: 3 }}>
            <AlertTitle> Your cart is empty</AlertTitle>

            <Link
              component='button'
              onClick={() => navigate('/')}
              color='inherit'
              variant='body2'
            >
              Go Back
            </Link>
          </Alert>
        ) : (
          <CartItemsList cartItems={cartItems} />
        )}
      </Grid>

      <Grid item xs={6} md={4}>
        <CartSummary cartItems={cartItems} />
      </Grid>
    </Grid>
  );
};

export default CartPage;
