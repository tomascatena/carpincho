import { createSlice, SerializedError, PayloadAction } from '@reduxjs/toolkit';
import { IAddCartItem, ICartItem } from '../../../types/types';

export interface CartState {
  cartItems: ICartItem[];
  loading: 'idle' | 'pending';
  currentRequestId: string | undefined;
  error: SerializedError | null;
}

const initialState: CartState = {
  cartItems: [],
  loading: 'idle',
  currentRequestId: undefined,
  error: null,
};

export const cartSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    hydrateCartItem: (state, action: PayloadAction<ICartItem[]>) => {
      state.cartItems = action.payload;
    },
    addCartItem(state, action: PayloadAction<IAddCartItem>) {
      const { item, quantity } = action.payload;

      const existItem = state.cartItems.some(
        (cartItem) => cartItem.product === item._id
      );

      if (existItem) {
        state.cartItems = state.cartItems.map((cartItem) => {
          if (cartItem.product === item._id) {
            cartItem.quantity += quantity;
          }
          return cartItem;
        });
      } else {
        state.cartItems.push({
          product: item._id,
          quantity,
          image: item.image,
          price: item.price,
          name: item.name,
        });
      }

      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    removeCartItem(state, action: PayloadAction<string>) {
      const productId = action.payload;

      state.cartItems = state.cartItems.filter(
        (cartItem) => cartItem.product !== productId
      );

      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
