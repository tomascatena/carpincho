import React, { FC, useEffect } from 'react';
import { useAppDispatch, useTypedSelector } from '../hooks';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Typography from '@mui/material/Typography';
import DetailsOfOrder from '../components/DetailsOfOrder/DetailsOfOrder';
import OrderSummary from '../components/OrderSummary/OrderSummary';
import { getOrderDetails } from '../store/features/order/order.thunk';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from '../constants/constants';

const OrderPage: FC = () => {
  const { orderDetails, loading, error } = useTypedSelector(
    (state) => state.order
  );

  const { user } = useTypedSelector((state) => state.user);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { orderId } = useParams();

  useEffect(() => {
    if (!user) {
      navigate(ROUTES.LOGIN);
    }

    if (orderId) {
      dispatch(getOrderDetails(orderId));
    }
  }, [user]);

  return (
    <>
      <Typography
        variant='h3'
        component='h1'
        sx={{ marginBottom: 5, marginTop: 3 }}
        color='text.primary'
      >
        Order Details
      </Typography>

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
          orderDetails && (
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              <Grid item xs={12} md={8}>
                <Typography
                  variant='h4'
                  component='h2'
                  sx={{ marginBottom: 5, marginTop: 3 }}
                  color='text.primary'
                >
                  Order {orderDetails?._id}
                </Typography>

                <DetailsOfOrder orderDetails={orderDetails} />
              </Grid>

              <Grid item xs={12} md={4}>
                <OrderSummary orderDetails={orderDetails} loading={loading} />
              </Grid>
            </Grid>
          )
        )}
      </Box>
    </>
  );
};

export default OrderPage;
