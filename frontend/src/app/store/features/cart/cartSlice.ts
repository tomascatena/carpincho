import { createSlice, SerializedError, PayloadAction } from '@reduxjs/toolkit';
import {
  IAddCartItem,
  ICartItem,
  ShippingAddress,
  Nullable,
} from '../../../types/types';

export interface CartState {
  cartItems: ICartItem[];
  shippingAddress: Nullable<ShippingAddress>;
  loading: 'idle' | 'pending';
  currentRequestId: string | undefined;
  error: SerializedError | null;
}

const initialState: CartState = {
  cartItems: [],
  shippingAddress: null,
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
    hydrateShippingAddress: (state, action: PayloadAction<ShippingAddress>) => {
      state.shippingAddress = action.payload;
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
          countInStock: item.countInStock,
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
    setCartItemQuantity(
      state,
      action: PayloadAction<{ productId: string; quantity: number }>
    ) {
      const { productId, quantity } = action.payload;

      const existItem = state.cartItems.some(
        (cartItem) => cartItem.product === productId
      );

      if (existItem) {
        state.cartItems = state.cartItems.map((cartItem) => {
          if (cartItem.product === productId) {
            cartItem.quantity = quantity;
          }
          return cartItem;
        });

        localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      }
    },
    saveShippingAddress(state, action: PayloadAction<ShippingAddress>) {
      state.shippingAddress = action.payload;

      localStorage.setItem(
        'shippingAddress',
        JSON.stringify(state.shippingAddress)
      );
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
