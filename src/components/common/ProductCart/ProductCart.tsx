import { FC } from 'react';
import { IProduct } from '../../../models/IProduct';
import './Cart.css';

type ProductCartPropsType = {
  product: any;
  handleAddToCart?: (product: IProduct) => void;
  handleDelete?: (id: string) => void;
  handleUpdate?: (id: string) => void;
};

export const ProductCart: FC<ProductCartPropsType> = (props) => {
  const { product, handleAddToCart, handleDelete, handleUpdate } = props;

  const handleShowProduct = () => {
    alert(product.title);
  };

  return (
    <div className="cart">
      <div>
        <p className="title" onClick={() => handleShowProduct()}>
          Title: {product.title}
        </p>
        <p>Price: {product.price}</p>
        <p>Description: {product.description}</p>
      </div>
      <div>
        {handleUpdate && (
          <button onClick={() => handleUpdate(product?.id)}>Edit</button>
        )}
        {handleDelete && (
          <button onClick={() => handleDelete(product?.id)}>Delete</button>
        )}
        {handleAddToCart && (
          <button
            onClick={() => handleAddToCart(product)}
            disabled={product.inCart}
          >
            Add to cart
          </button>
        )}
      </div>
    </div>
  );
};
