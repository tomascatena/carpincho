import React, { FC, useState, Dispatch, SetStateAction } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MaterialUISwitch from '../commonStyledComponents/MUISwitch';
import { useTypedSelector, useActions } from '../../hooks';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/constants';
import { Search, SearchIconWrapper, StyledInputBase } from './Header.styled';

interface Props {
  setDarkTheme: Dispatch<SetStateAction<boolean>>;
  darkTheme: boolean;
}

const Header: FC<Props> = ({ setDarkTheme, darkTheme }) => {
  const { userLogout } = useActions();
  const navigate = useNavigate();
  const { cartItems } = useTypedSelector((state) => state.cart);
  const { user } = useTypedSelector((state) => state.user);

  const numberOfItemsOnCart = cartItems.reduce(
    (previousValue, currentValue) => {
      return previousValue + currentValue.quantity;
    },
    0
  );

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const goToCartPage = () => {
    navigate(ROUTES.CART);
  };

  const handleProfileClick = () => {
    handleMenuClose();
    navigate(ROUTES.PROFILE);
  };

  const handleLoginClick = () => {
    handleMenuClose();
    navigate(ROUTES.LOGIN);
  };

  const handleLogoutClick = () => {
    handleMenuClose();
    userLogout();
    navigate('/');
  };

  const menuId = 'primary-search-account-menu';

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleProfileClick} sx={{ minWidth: 150 }}>
        Profile
      </MenuItem>

      <MenuItem onClick={handleLogoutClick} sx={{ minWidth: 150 }}>
        Logout
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <MaterialUISwitch
          checked={darkTheme}
          onChange={() => setDarkTheme(!darkTheme)}
        />
      </MenuItem>

      <MenuItem>
        <IconButton
          onClick={goToCartPage}
          size='large'
          aria-label='show 4 new mails'
          color='inherit'
        >
          <Badge badgeContent={numberOfItemsOnCart} color='error'>
            <ShoppingCartIcon />
          </Badge>
        </IconButton>

        <p>Cart</p>
      </MenuItem>

      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size='large'
          aria-label='account of current user'
          aria-controls='primary-search-account-menu'
          aria-haspopup='true'
          color='inherit'
        >
          <AccountCircle />
        </IconButton>

        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box>
      <AppBar position='static'>
        <Container>
          <Toolbar>
            <IconButton
              size='large'
              edge='start'
              color='inherit'
              aria-label='open drawer'
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>

            <Button
              onClick={() => navigate('/')}
              variant='text'
              color='inherit'
            >
              Carpincho
            </Button>

            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>

              <StyledInputBase
                placeholder='Search…'
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>

            <Box sx={{ flexGrow: 1 }} />

            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <MaterialUISwitch
                  checked={darkTheme}
                  onChange={() => setDarkTheme(!darkTheme)}
                />
              </Box>

              <IconButton
                onClick={goToCartPage}
                size='large'
                aria-label='show 4 new mails'
                color='inherit'
              >
                <Badge badgeContent={numberOfItemsOnCart} color='error'>
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>

              {user ? (
                <IconButton
                  size='large'
                  edge='end'
                  aria-label='account of current user'
                  aria-controls={menuId}
                  aria-haspopup='true'
                  onClick={handleProfileMenuOpen}
                  color='inherit'
                  sx={{ borderRadius: '10000rem' }}
                >
                  <Typography variant='subtitle1' sx={{ marginRight: 1 }}>
                    {user.name}
                  </Typography>

                  <AccountCircle />
                </IconButton>
              ) : (
                <Button
                  onClick={handleLoginClick}
                  variant='text'
                  color='inherit'
                  sx={{
                    borderRadius: '1000rem',
                    paddingLeft: 3,
                    paddingRight: 3,
                  }}
                >
                  Login
                </Button>
              )}
            </Box>

            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size='large'
                aria-label='show more'
                aria-controls={mobileMenuId}
                aria-haspopup='true'
                onClick={handleMobileMenuOpen}
                color='inherit'
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
};

export default Header;
