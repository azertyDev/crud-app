import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { fetchCart } from '../../../store/slices/ActionCreators';
import { ProductCart } from '../../../components/common/ProductCart/ProductCart';

export const CartViewContainer = () => {
  const {
    data: cart,
    isLoading,
    error,
  } = useAppSelector((state) => state.cartReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCart());
  }, []);

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {cart?.map((item) => (
        <ProductCart key={item.id} {...item} />
      ))}
    </div>
  );
};
