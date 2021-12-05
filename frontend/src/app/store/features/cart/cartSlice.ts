import { createSlice, SerializedError, PayloadAction } from '@reduxjs/toolkit';
import { CHECKOUT_STEPS } from '../../../constants/constants';
import {
  IAddCartItem,
  ICartItem,
  ShippingAddress,
  Nullable,
  CheckoutStep,
} from '../../../types/types.d';

const checkoutSteps = [
  {
    id: CHECKOUT_STEPS.LOGIN,
    label: 'Sign In',
    link: '/login?redirect=shipping',
    completed: false,
    isActive: false,
  },
  {
    id: CHECKOUT_STEPS.SHIPPING_ADDRESS,
    label: 'Shipping Address',
    link: '/shipping',
    completed: false,
    isActive: false,
  },
  {
    id: CHECKOUT_STEPS.PAYMENT,
    label: 'Payment',
    link: '/payment',
    completed: false,
    isActive: false,
  },
  {
    id: CHECKOUT_STEPS.SHIPPING_ADDRESS,
    label: 'Place Order',
    link: '/order',
    completed: false,
    isActive: false,
  },
];

export interface CartState {
  cartItems: ICartItem[];
  shippingAddress: Nullable<ShippingAddress>;
  loading: 'idle' | 'pending';
  currentRequestId: string | undefined;
  error: SerializedError | null;
  checkoutSteps: CheckoutStep[];
}

const initialState: CartState = {
  cartItems: [],
  shippingAddress: null,
  loading: 'idle',
  currentRequestId: undefined,
  error: null,
  checkoutSteps: checkoutSteps,
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
    resetCheckoutSteps(state) {
      state.checkoutSteps.forEach((step) => {
        step.completed = false;
        step.isActive = false;
      });
    },
    setCheckoutStepCompleted(state, action: PayloadAction<string>) {
      console.log('setCheckoutStepCompleted');
      let nextActiveStep;
      state.checkoutSteps.forEach((step, i) => {
        if (step.id === action.payload) {
          step.completed = true;
          step.isActive = false;
          nextActiveStep = i + 1;
        }
      });

      console.log(nextActiveStep);

      if (nextActiveStep && nextActiveStep < checkoutSteps.length) {
        state.checkoutSteps[nextActiveStep].isActive = true;
      }
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
