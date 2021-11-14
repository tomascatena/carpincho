import { Middleware } from 'redux';
import { cartSlice } from './cartSlice';
import { isAnyOf } from '@reduxjs/toolkit';

export const cartMiddleware: Middleware = (storeApi) => (next) => (action) => {
  const state = storeApi.getState();

  const matchesMyAction = isAnyOf(
    cartSlice.actions.addCartItem,
    cartSlice.actions.removeCartItem
  );

  console.log('Cart middleware');
  console.log(state.cartItems);

  const result = next(action);

  if (matchesMyAction(action)) {
    console.log('Set local storage');
  }

  return result;
};
