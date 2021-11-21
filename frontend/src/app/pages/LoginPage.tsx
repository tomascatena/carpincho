import React, { FC, useState, FormEvent, useEffect } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { useAppDispatch, useTypedSelector } from '../hooks';
import { userLogin } from '../store/features/user/user.thunk';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Fade from '@mui/material/Fade';
import { styled } from '@mui/material/styles';

const FormBox = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
});

const LoginPage: FC = () => {
  const [showError, setShowError] = useState(false);

  const [email, setEmail] = useState({
    value: '',
    isValidated: false,
    isValid: false,
  });
  const [password, setPassword] = useState({
    value: '',
    isValidated: false,
    isValid: false,
  });

  const { user, loading, error } = useTypedSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setEmail({ ...email, isValidated: true });
    setPassword({ ...password, isValidated: true });

    dispatch(userLogin({ email: email.value, password: password.value }));

    if (user && !error && loading !== 'pending') {
      if (redirect) {
        navigate(`/${redirect}`);
      } else {
        navigate('/');
      }
    }
  };

  useEffect(() => {
    if (error) {
      setShowError(true);

      const timeout = setTimeout(() => {
        setShowError(false);
      }, 5000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [error]);

  return (
    <Container maxWidth='sm'>
      <Typography
        variant='h4'
        component='h2'
        sx={{ marginBottom: 5, marginTop: 3 }}
        color='text.primary'
      >
        Sign In
      </Typography>

      <Fade
        appear={showError}
        in={showError}
        timeout={1000}
        unmountOnExit={true}
      >
        <Alert
          severity='error'
          variant='filled'
          sx={{
            position: 'absolute',
            top: '2rem',
            left: '50%',
            transform: 'translateX(-50%)',
            minWidth: '30%',
          }}
          onClose={() => setShowError(false)}
        >
          <AlertTitle>Invalid credentials</AlertTitle>
        </Alert>
      </Fade>

      <FormBox noValidate onSubmit={handleSubmit}>
        <TextField
          id='standard-basic'
          label='Email'
          variant='standard'
          fullWidth
          required
          type='text'
          value={email.value}
          error={email.isValidated && !email.isValid}
          onBlur={() => setEmail({ ...email, isValidated: true })}
          onChange={(e) =>
            setEmail({
              ...email,
              value: e.target.value,
              isValid: e.target.value.length >= 2,
            })
          }
          helperText={
            email.isValidated && !email.isValid && 'Email is required.'
          }
          sx={{ minHeight: '5rem' }}
        />

        <TextField
          id='standard-basic'
          label='Password'
          fullWidth
          required
          type='password'
          variant='standard'
          value={password.value}
          error={password.isValidated && !password.isValid}
          onBlur={() => setPassword({ ...password, isValidated: true })}
          onChange={(e) =>
            setPassword({
              ...password,
              value: e.target.value,
              isValid: e.target.value.length > 5,
            })
          }
          helperText={
            password.isValidated && !password.isValid && 'Password is required.'
          }
          sx={{ minHeight: '5rem' }}
        />

        <Button
          variant='contained'
          sx={{ marginTop: 2 }}
          type='submit'
          disabled={
            !email.isValid || !password.isValid || loading === 'pending'
          }
        >
          {loading === 'pending' ? (
            <>
              <CircularProgress size={20} sx={{ marginRight: 1 }} /> Singing In
            </>
          ) : (
            'Sign In'
          )}
        </Button>
      </FormBox>

      <Typography
        variant='subtitle1'
        sx={{ marginTop: 4 }}
        color='text.primary'
      >
        Don&lsquo;t have an account?{' '}
        <Link
          to={redirect ? `/register/${redirect}` : '/register'}
          style={{ color: 'inherit' }}
        >
          Register here
        </Link>
      </Typography>
    </Container>
  );
};

export default LoginPage;
