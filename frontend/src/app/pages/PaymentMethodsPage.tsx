import React, { FC, useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTypedSelector, useActions } from '../hooks';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { FormBox } from '../components/styledComponents/FormBox';
import CheckoutSteps from '../components/CheckoutSteps';
import {
  CHECKOUT_STEPS,
  PAYMENT_METHODS,
  ROUTES,
} from '../constants/constants';

const PaymentMethodsPage: FC = () => {
  const navigate = useNavigate();
  const { savePaymentMethod, setCheckoutStepCompleted } = useActions();

  const [paymentMethod, setPaymentMethod] = useState(PAYMENT_METHODS.PAYPAL);

  const { shippingAddress } = useTypedSelector((state) => state.cart);

  if (!shippingAddress) {
    navigate(ROUTES.SHIPPING_ADDRESS);
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    savePaymentMethod(paymentMethod);
    setCheckoutStepCompleted(CHECKOUT_STEPS.PAYMENT);
    navigate(ROUTES.PLACE_ORDER);
  };

  return (
    <Container maxWidth='sm'>
      <CheckoutSteps />

      <Typography
        variant='h3'
        component='h1'
        sx={{ marginBottom: 5, marginTop: 3 }}
        color='text.primary'
      >
        Payment Methods
      </Typography>

      <FormBox noValidate onSubmit={handleSubmit}>
        <FormControl component='fieldset'>
          <FormLabel component='legend'>Payment Method</FormLabel>

          <RadioGroup
            defaultValue={PAYMENT_METHODS.PAYPAL}
            aria-label='payment-method'
            name='radio-buttons-select-payment-method'
            onChange={(e) => setPaymentMethod(e.target.value)}
            sx={{ gap: 2 }}
          >
            <FormControlLabel
              value={PAYMENT_METHODS.PAYPAL}
              control={<Radio />}
              label='PayPal or Credit Card'
            />

            <FormControlLabel
              value={PAYMENT_METHODS.STRIPE}
              control={<Radio />}
              label={PAYMENT_METHODS.STRIPE}
            />
          </RadioGroup>
        </FormControl>

        <Button
          variant='contained'
          sx={{ marginTop: 5, paddingTop: 1, paddingBottom: 1 }}
          type='submit'
        >
          Continue
        </Button>
      </FormBox>
    </Container>
  );
};

export default PaymentMethodsPage;
