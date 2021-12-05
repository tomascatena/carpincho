import React, { FC, useState, FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useTypedSelector } from '../hooks';
import { updateUserProfile } from '../store/features/user/user.thunk';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Fade from '@mui/material/Fade';
import { styled } from '@mui/material/styles';
import { ROUTES } from '../constants/constants';

const FormBox = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
});

const UserProfilePage: FC = () => {
  const [showError, setShowError] = useState(false);

  const [name, setName] = useState({
    value: '',
    isValidated: false,
    isValid: false,
  });
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
  const [confirmPassword, setConfirmPassword] = useState({
    value: '',
    isValidated: false,
    isValid: false,
  });

  const { user, loading, error } = useTypedSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!user) {
      navigate(`${ROUTES.LOGIN}?redirect=${ROUTES.PROFILE.replace('/', '')}`);
    } else {
      setName({ ...name, value: user.name, isValid: true });
      setEmail({ ...email, value: user.email, isValid: true });
    }
  }, [user]);

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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setName({ ...name, isValidated: true });
    setEmail({ ...email, isValidated: true });
    setPassword({ ...password, isValidated: true });
    setConfirmPassword({ ...confirmPassword, isValidated: true });

    dispatch(
      updateUserProfile({
        name: name.value,
        email: email.value,
        ...(password && { password: password.value }),
      })
    );
  };

  const isButtonDisabled =
    !email.isValid ||
    !name.isValid ||
    loading === 'pending' ||
    ((Boolean(password.value) || Boolean(confirmPassword.value)) &&
      (!password.isValid ||
        !confirmPassword.isValid ||
        password.value !== confirmPassword.value));

  const isPasswordError =
    (password.value !== '' && password.isValidated && !password.isValid) ||
    (password.isValidated &&
      confirmPassword.isValidated &&
      password.value !== confirmPassword.value);

  const isConfirmPasswordError =
    (confirmPassword.value !== '' &&
      confirmPassword.isValidated &&
      !confirmPassword.isValid) ||
    (confirmPassword.isValidated &&
      password.isValidated &&
      password.value !== confirmPassword.value);

  const helperTextPassword = () => {
    if (password.value !== '' && password.isValidated && !password.value) {
      return 'Password is required.';
    } else if (password.value !== confirmPassword.value) {
      return 'Passwords must match';
    }
  };

  const helperTextConfirmPassword = () => {
    if (
      confirmPassword.value !== '' &&
      confirmPassword.isValidated &&
      !confirmPassword.value
    ) {
      return 'Password is required.';
    } else if (password.value !== confirmPassword.value) {
      return 'Passwords must match';
    }
  };

  const helperTextName = () => {
    if (name.isValidated && !name.isValid) {
      return 'Name is required.';
    }
  };

  const helperTextEmail = () => {
    if (email.isValidated && !email.isValid) {
      return 'Email is required.';
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <Container maxWidth='sm'>
          <Typography
            variant='h4'
            component='h2'
            sx={{ marginBottom: 5, marginTop: 3 }}
            color='text.primary'
          >
            Update Profile
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
              <AlertTitle>{error || 'Sign up failed'}</AlertTitle>
            </Alert>
          </Fade>

          <FormBox noValidate onSubmit={handleSubmit}>
            <TextField
              label='Name'
              variant='standard'
              fullWidth
              required
              type='text'
              value={name.value}
              error={name.isValidated && !name.isValid}
              onBlur={() => setName({ ...name, isValidated: true })}
              onChange={(e) =>
                setName({
                  ...name,
                  value: e.target.value,
                  isValid: e.target.value.length >= 2,
                })
              }
              helperText={helperTextName()}
              sx={{ minHeight: '5rem' }}
            />

            <TextField
              label='Email'
              variant='standard'
              fullWidth
              required
              type='email'
              color='success'
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
              helperText={helperTextEmail()}
              sx={{ minHeight: '5rem' }}
            />

            <TextField
              label='New Password'
              fullWidth
              type='password'
              variant='standard'
              value={password.value}
              error={isPasswordError}
              onBlur={() => setPassword({ ...password, isValidated: true })}
              onChange={(e) =>
                setPassword({
                  ...password,
                  value: e.target.value,
                  isValid: e.target.value.length >= 5,
                })
              }
              helperText={helperTextPassword()}
              sx={{ minHeight: '5rem' }}
            />

            <TextField
              label='Confirm New Password'
              fullWidth
              type='password'
              variant='standard'
              value={confirmPassword.value}
              error={isConfirmPasswordError}
              onBlur={() =>
                setConfirmPassword({ ...confirmPassword, isValidated: true })
              }
              onChange={(e) =>
                setConfirmPassword({
                  ...confirmPassword,
                  value: e.target.value,
                  isValid: e.target.value.length >= 5,
                })
              }
              helperText={helperTextConfirmPassword()}
              sx={{ minHeight: '5rem' }}
            />

            <Button
              variant='contained'
              sx={{ marginTop: 2, paddingTop: 1, paddingBottom: 1 }}
              type='submit'
              disabled={isButtonDisabled}
            >
              {loading === 'pending' ? (
                <>
                  <CircularProgress size={20} sx={{ marginRight: 1 }} />{' '}
                  Updating Profile
                </>
              ) : (
                'Update Profile'
              )}
            </Button>
          </FormBox>
        </Container>
      </Grid>

      <Grid item xs={12} md={8}>
        <Typography
          variant='h4'
          component='h2'
          sx={{ marginBottom: 5, marginTop: 3 }}
          color='text.primary'
        >
          Orders
        </Typography>
      </Grid>
    </Grid>
  );
};

export default UserProfilePage;
