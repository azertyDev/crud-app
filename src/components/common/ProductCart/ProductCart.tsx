import React, { FC } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { IProduct } from '../../../models/IProduct';
import {
  useDeleteProductMutation,
  useAddToCartMutation,
} from '../../../services/ProductService';
import './Cart.css';

export const ProductCart: FC<IProduct> = (props) => {
  const { push } = useHistory();

  const [deleteProduct, {}] = useDeleteProductMutation();
  const [addToCart, {}] = useAddToCartMutation();

  const handleDelete = () => {
    deleteProduct(props.id as string);
  };

  const handleUpdate = () => {
    push(`/products/${props.id}`);
  };

  const handleAddToCart = async (product: IProduct) => {
    await addToCart(product);
  };

  return (
    <div className="cart">
      <Link to={`/product/${props.id}`}>
        <div>
          <p>Title: {props.title}</p>
          <p>Price: {props.price}</p>
          <p>Description: {props.description}</p>
        </div>
      </Link>
      <div>
        <button onClick={() => handleUpdate()}>Edit</button>
        <button onClick={() => handleDelete()}>Delete</button>
        <button onClick={() => handleAddToCart(props)} disabled={props.inCart}>
          Add to cart
        </button>
      </div>
    </div>
  );
};
