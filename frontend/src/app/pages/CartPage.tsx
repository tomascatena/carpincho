import React, { useEffect } from 'react';
import { useTypedSelector, useAppDispatch, useActions } from '../hooks';
import { fetchProductById } from '../store/features/productDetails/productDetails.thunk';
import {
  Link,
  useParams,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';

const CartPage = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const qty = searchParams.get('qty');

  const { cartItems } = useTypedSelector((state) => state.cart);
  const { productDetails, loading, error } = useTypedSelector(
    (state) => state.productDetails
  );
  const { addCartItem, removeCartItem } = useActions();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (productId) {
      dispatch(fetchProductById(productId));
    }

    if (productDetails && qty && parseInt(qty)) {
      addCartItem({ quantity: parseInt(qty), item: productDetails });
    }
  }, []);

  console.log(cartItems);

  return <div>Cart</div>;
};

export default CartPage;
