import { cartActions } from './features/cart/cartSlice';
import { store } from './store';

export const getCartITemsFromLocalStorage = (): void => {
  try {
    const persistedCartItems = localStorage.getItem('cartItems');

    if (persistedCartItems) {
      const cartItems = JSON.parse(persistedCartItems);

      store.dispatch(cartActions.hydrateCartItem(cartItems));
    }
  } catch (error) {
    console.log(error);
  }
};
