import React, { FC, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import { SelectChangeEvent } from '@mui/material/Select';
import AlertTitle from '@mui/material/AlertTitle';
import { useTypedSelector, useAppDispatch } from '../hooks';
import { fetchProductById } from '../store/features/productDetails/productDetails.thunk';
import ProductDetails from '../components/ProductDetails';
import ProductPageSummary from '../components/ProductPageSummary';
import { useNavigate } from 'react-router-dom';

const ProductPage: FC = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [quantity, setQuantity] = useState<number>(1);

  const { productDetails, loading, error } = useTypedSelector(
    (state) => state.productDetails
  );

  const dispatch = useAppDispatch();

  const fetchAllProducts = async () => {
    try {
      if (productId) {
        await dispatch(fetchProductById(productId));
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const handleQuantityChange = (event: SelectChangeEvent) => {
    setQuantity(parseInt(event.target.value));
  };

  const addToCartHandler = () => {
    navigate(`/cart/${productId}?qty=${quantity}`);
  };

  return (
    <>
      <Link to='/' style={{ textDecoration: 'none' }}>
        <Button variant='outlined'>Go Back</Button>
      </Link>

      <Box sx={{ marginTop: 2 }}>
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
          <Alert severity='error' variant='filled'>
            <AlertTitle>Error</AlertTitle>
            {error.message}
          </Alert>
        ) : (
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {productDetails && (
              <>
                <ProductDetails productDetails={productDetails} />

                <ProductPageSummary
                  productDetails={productDetails}
                  quantity={quantity}
                  handleQuantityChange={handleQuantityChange}
                  addToCartHandler={addToCartHandler}
                />
              </>
            )}
          </Grid>
        )}
      </Box>
    </>
  );
};

export default ProductPage;