import React, { FC, useState, FormEvent, useEffect } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { useAppDispatch, useTypedSelector, useActions } from '../hooks';
import { userRegister } from '../store/features/user/user.thunk';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import AlertTitle from '@mui/material/AlertTitle';
import Fade from '@mui/material/Fade';
import { styled } from '@mui/material/styles';
import CheckoutSteps from '../components/CheckoutSteps';
import { CHECKOUT_STEPS } from '../constants/constants';

const FormBox = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
});

interface FormField {
  value: string;
  isValidated: boolean;
  isValid: boolean;
}

const emptyFormField: FormField = {
  value: '',
  isValidated: false,
  isValid: false,
};

const ShippingPage: FC = () => {
  const { shippingAddress } = useTypedSelector((state) => state.cart);

  const [address, setAddress] = useState({
    ...emptyFormField,
    value: shippingAddress?.address || '',
  });
  const [city, setCity] = useState({
    ...emptyFormField,
    value: shippingAddress?.city || '',
  });
  const [postalCode, setPostalCode] = useState({
    ...emptyFormField,
    value: shippingAddress?.postalCode || '',
  });
  const [country, setCountry] = useState({
    ...emptyFormField,
    value: shippingAddress?.country || '',
  });

  const setInitialState = () => {
    if (shippingAddress?.address) {
      setAddress({
        value: shippingAddress.address,
        isValidated: true,
        isValid: true,
      });
    }
    if (shippingAddress?.city) {
      setCity({
        value: shippingAddress.city,
        isValidated: true,
        isValid: true,
      });
    }
    if (shippingAddress?.postalCode) {
      setPostalCode({
        value: shippingAddress.postalCode,
        isValidated: true,
        isValid: true,
      });
    }
    if (shippingAddress?.country) {
      setCountry({
        value: shippingAddress.country,
        isValidated: true,
        isValid: true,
      });
    }
  };

  useEffect(() => {
    setInitialState();
  }, [shippingAddress]);

  const navigate = useNavigate();
  const { saveShippingAddress, setCheckoutStepCompleted } = useActions();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    saveShippingAddress({
      address: address.value,
      city: city.value,
      postalCode: postalCode.value,
      country: country.value,
    });

    setCheckoutStepCompleted(CHECKOUT_STEPS.SHIPPING_ADDRESS);
    navigate('/payment');
  };

  const helperTextAddress = () => {
    if (address.isValidated && !address.isValid) {
      return 'Address is required.';
    }
  };

  const helperTextCity = () => {
    if (address.isValidated && !address.isValid) {
      return 'City is required.';
    }
  };

  const helperTextPostalCode = () => {
    if (address.isValidated && !address.isValid) {
      return 'PostalCode is required.';
    }
  };

  const helperTextCountry = () => {
    if (address.isValidated && !address.isValid) {
      return 'Country is required.';
    }
  };

  const isButtonDisabled =
    !address.isValid ||
    !city.isValid ||
    !postalCode.isValid ||
    !country.isValid;

  return (
    <Container maxWidth='sm'>
      <CheckoutSteps />
      <Typography
        variant='h3'
        component='h1'
        sx={{ marginBottom: 5, marginTop: 3 }}
        color='text.primary'
      >
        Shipping
      </Typography>

      <FormBox noValidate onSubmit={handleSubmit}>
        <TextField
          label='Address'
          variant='standard'
          fullWidth
          required
          type='text'
          value={address.value}
          error={address.isValidated && !address.isValid}
          onBlur={() => setAddress({ ...address, isValidated: true })}
          onChange={(e) =>
            setAddress({
              ...address,
              value: e.target.value,
              isValid: e.target.value.length >= 2,
            })
          }
          helperText={helperTextAddress()}
          sx={{ minHeight: '5rem' }}
        />

        <TextField
          label='City'
          variant='standard'
          fullWidth
          required
          type='text'
          value={city.value}
          error={city.isValidated && !city.isValid}
          onBlur={() => setCity({ ...city, isValidated: true })}
          onChange={(e) =>
            setCity({
              ...city,
              value: e.target.value,
              isValid: e.target.value.length >= 2,
            })
          }
          helperText={helperTextCity()}
          sx={{ minHeight: '5rem' }}
        />

        <TextField
          label='Postal Code'
          variant='standard'
          fullWidth
          required
          type='text'
          value={postalCode.value}
          error={postalCode.isValidated && !postalCode.isValid}
          onBlur={() => setPostalCode({ ...postalCode, isValidated: true })}
          onChange={(e) =>
            setPostalCode({
              ...postalCode,
              value: e.target.value,
              isValid: e.target.value.length >= 2,
            })
          }
          helperText={helperTextPostalCode()}
          sx={{ minHeight: '5rem' }}
        />

        <TextField
          label='Country'
          variant='standard'
          fullWidth
          required
          type='text'
          value={country.value}
          error={country.isValidated && !country.isValid}
          onBlur={() => setCountry({ ...country, isValidated: true })}
          onChange={(e) =>
            setCountry({
              ...country,
              value: e.target.value,
              isValid: e.target.value.length >= 2,
            })
          }
          helperText={helperTextCountry()}
          sx={{ minHeight: '5rem' }}
        />

        <Button
          variant='contained'
          sx={{ marginTop: 2, paddingTop: 1, paddingBottom: 1 }}
          type='submit'
          disabled={isButtonDisabled}
        >
          Continue
        </Button>
      </FormBox>
    </Container>
  );
};

export default ShippingPage;
