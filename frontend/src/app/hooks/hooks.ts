import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store/store';
import { bindActionCreators } from '@reduxjs/toolkit';
import { productActions } from '../store/features/products/productsSlice';

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useActions = (): typeof productActions => {
  const dispatch = useDispatch();
  return bindActionCreators({ ...productActions }, dispatch);
};

export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>(); // Export a hook that can be reused to resolve types
