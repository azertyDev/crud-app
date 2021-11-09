import React, { FC } from "react";
import { Link, useHistory } from "react-router-dom";
import { IProduct } from "src/models/IProduct";
import { useDeleteProductMutation } from "src/services/ProductService";
import "./Cart.css";

export const ProductCart: FC<IProduct> = (props) => {
  const { push } = useHistory();

  const [deleteProduct, {}] = useDeleteProductMutation();

  const handleDelete = () => {
    deleteProduct(props.id as string);
  };

  const handleUpdate = () => {
    push(`/products/${props.id}`);
  };

  return (
    <div className="cart">
      <div>
        <Link to={`/product/${props.id}`}>
          <p>{props.title}</p>
        </Link>
        <p>{props.price}</p>
        <p>{props.description}</p>
      </div>
      <div>
        <button onClick={() => handleDelete()}>Delete</button>
        <button onClick={() => handleUpdate()}>UpdateEdit</button>
        <button>Add to cart</button>
      </div>
    </div>
  );
};
