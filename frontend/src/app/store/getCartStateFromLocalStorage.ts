import { cartActions } from './features/cart/cartSlice';
import { store } from './store';

export const getCartStateFromLocalStorage = (): void => {
  try {
    const persistedCartItems = localStorage.getItem('cartItems');
    const persistedShippingAddress = localStorage.getItem('shippingAddress');

    if (persistedCartItems) {
      const cartItems = JSON.parse(persistedCartItems);

      store.dispatch(cartActions.hydrateCartItem(cartItems));
    }

    if (persistedShippingAddress) {
      const shippingAddress = JSON.parse(persistedShippingAddress);

      store.dispatch(cartActions.hydrateShippingAddress(shippingAddress));
    }
  } catch (error) {
    console.log(error);
  }
};
