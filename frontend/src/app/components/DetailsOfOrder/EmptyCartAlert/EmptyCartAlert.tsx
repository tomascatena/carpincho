import React, { FC } from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';

const EmptyCartAlert: FC = () => {
  const navigate = useNavigate();

  return (
    <Alert severity='info' variant='filled' sx={{ marginTop: 3 }}>
      <AlertTitle> Your cart is empty</AlertTitle>

      <Link
        component='button'
        onClick={() => navigate('/')}
        color='inherit'
        variant='body2'
      >
        See More Products
      </Link>
    </Alert>
  );
};

export default EmptyCartAlert;
