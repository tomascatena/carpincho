import { createSlice, SerializedError, PayloadAction } from '@reduxjs/toolkit';
import { CHECKOUT_STEPS, ROUTES, TAX_RATE } from '../../../constants/constants';
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
    link: `${ROUTES.LOGIN}?redirect=${ROUTES.SHIPPING_ADDRESS.replace(
      '/',
      ''
    )}`,
    completed: false,
    isActive: false,
  },
  {
    id: CHECKOUT_STEPS.SHIPPING_ADDRESS,
    label: 'Shipping Address',
    link: ROUTES.SHIPPING_ADDRESS,
    completed: false,
    isActive: false,
  },
  {
    id: CHECKOUT_STEPS.PAYMENT,
    label: 'Payment',
    link: ROUTES.PAYMENT_METHOD,
    completed: false,
    isActive: false,
  },
  {
    id: CHECKOUT_STEPS.PLACE_ORDER,
    label: 'Place Order',
    link: ROUTES.PLACE_ORDER,
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
  paymentMethod: Nullable<string>;
  itemsPrice: Nullable<number>;
  taxPrice: Nullable<number>;
  shippingPrice: Nullable<number>;
  totalPrice: Nullable<number>;
}

const initialState: CartState = {
  cartItems: [],
  shippingAddress: null,
  loading: 'idle',
  currentRequestId: undefined,
  error: null,
  checkoutSteps: checkoutSteps,
  paymentMethod: null,
  itemsPrice: null,
  taxPrice: null,
  shippingPrice: null,
  totalPrice: null,
};

const calculatePrices = (state: CartState): void => {
  state.itemsPrice = state.cartItems.reduce(
    (accumulatedPrice, item) => accumulatedPrice + item.quantity * item.price,
    0
  );

  state.shippingPrice = state.itemsPrice > 50 ? 0 : 7;

  state.taxPrice = state.itemsPrice * TAX_RATE;

  state.totalPrice = state.itemsPrice + state.shippingPrice + state.taxPrice;
};

export const cartSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    hydrateCartItem: (state, action: PayloadAction<ICartItem[]>) => {
      state.cartItems = action.payload;

      calculatePrices(state);
    },
    hydrateShippingAddress: (state, action: PayloadAction<ShippingAddress>) => {
      state.shippingAddress = action.payload;
    },
    hydratePaymentMethod: (state, action: PayloadAction<string>) => {
      state.paymentMethod = action.payload;
    },
    hydrateCheckoutSteps: (state, action: PayloadAction<CheckoutStep[]>) => {
      state.checkoutSteps = action.payload;
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

      calculatePrices(state);

      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    removeCartItem(state, action: PayloadAction<string>) {
      const productId = action.payload;

      state.cartItems = state.cartItems.filter(
        (cartItem) => cartItem.product !== productId
      );

      state.itemsPrice = null;
      state.taxPrice = null;
      state.shippingPrice = null;
      state.totalPrice = null;

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
    savePaymentMethod(state, action: PayloadAction<string>) {
      state.paymentMethod = action.payload;

      localStorage.setItem(
        'paymentMethod',
        JSON.stringify(state.paymentMethod)
      );
    },
    resetCheckoutSteps(state) {
      state.checkoutSteps.forEach((step) => {
        step.completed = false;
        step.isActive = false;
      });

      localStorage.removeItem('checkoutSteps');
    },
    setCheckoutStepCompleted(state, action: PayloadAction<string>) {
      let nextActiveStep;
      state.checkoutSteps.forEach((step, i) => {
        if (step.id === action.payload) {
          step.completed = true;
          step.isActive = false;
          nextActiveStep = i + 1;
        }
      });

      if (nextActiveStep && nextActiveStep < checkoutSteps.length) {
        state.checkoutSteps[nextActiveStep].isActive = true;
      }

      localStorage.setItem(
        'checkoutSteps',
        JSON.stringify(state.checkoutSteps)
      );
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
