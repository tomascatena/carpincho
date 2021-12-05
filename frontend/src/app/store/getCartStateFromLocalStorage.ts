import { cartActions } from './features/cart/cartSlice';
import { store } from './store';

export const getCartStateFromLocalStorage = (): void => {
  try {
    const persistedCartItems = localStorage.getItem('cartItems');
    const persistedShippingAddress = localStorage.getItem('shippingAddress');
    const persistedPaymentMethod = localStorage.getItem('paymentMethod');
    const persistedCheckoutSteps = localStorage.getItem('checkoutSteps');

    if (persistedCartItems) {
      const cartItems = JSON.parse(persistedCartItems);

      store.dispatch(cartActions.hydrateCartItem(cartItems));
    }

    if (persistedShippingAddress) {
      const shippingAddress = JSON.parse(persistedShippingAddress);

      store.dispatch(cartActions.hydrateShippingAddress(shippingAddress));
    }

    if (persistedCheckoutSteps) {
      const checkoutSteps = JSON.parse(persistedCheckoutSteps);

      store.dispatch(cartActions.hydrateCheckoutSteps(checkoutSteps));
    }

    if (persistedPaymentMethod) {
      const paymentMethod = JSON.parse(persistedPaymentMethod);

      store.dispatch(cartActions.hydratePaymentMethod(paymentMethod));
    }
  } catch (error) {
    console.log(error);
  }
};
