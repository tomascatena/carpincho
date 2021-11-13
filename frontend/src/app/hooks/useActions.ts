import { productActions } from '../store/features/products/productsSlice';
import { bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

export const useActions = (): typeof productActions => {
  const dispatch = useDispatch();
  return bindActionCreators({ ...productActions }, dispatch);
};
