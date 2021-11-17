import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { fetchCart } from '../../../store/slices/ActionCreators';
import { ProductCart } from '../../../components/common/ProductCart/ProductCart';
import {
  useDeleteFromCartMutation,
  useFetchCartQuery,
} from 'src/services/ProductService';

export const CartViewContainer = () => {
  const { data: cart, isLoading, error } = useFetchCartQuery();
  const dispatch = useAppDispatch();
  const [deleteFromCart, {}] = useDeleteFromCartMutation();

  const handleDelete = async (id: any) => {
    await deleteFromCart(id);
  };

  useEffect(() => {
    dispatch(fetchCart());
  }, []);

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {cart?.map((item) => (
        <ProductCart key={item.id} product={item} handleDelete={handleDelete} />
      ))}
    </div>
  );
};
