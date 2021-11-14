import { productActions } from '../store/features/products/productsSlice';
import { bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { productDetailsActions } from '../store/features/productDetails/productDetailsSlice';
import { cartActions } from '../store/features/cart/cartSlice';

const actions = { ...productActions, ...productDetailsActions, ...cartActions };

export const useActions = (): typeof actions => {
  const dispatch = useDispatch();
  return bindActionCreators(actions, dispatch);
};
