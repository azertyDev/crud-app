import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useUpdateProductMutation } from '../../../services/ProductService';

interface IProduct {
  id?: string;
  title?: string;
  description?: string;
  price?: number;
  inCart?: boolean;
}

type EditableProductPropsType = {
  id: string;
  product: IProduct | undefined;
};

export const EditableProduct: FC<EditableProductPropsType> = ({
  id,
  product,
}) => {
  const { push } = useHistory();
  const [updateProduct, {}] = useUpdateProductMutation();

  const initialState: IProduct = {
    title: product?.title,
    description: product?.description,
    price: product?.price,
    inCart: product?.inCart,
  };

  const [state, setState] = useState(initialState);

  const handleChange = ({
    target: { value, name },
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setState({ ...state, [name]: value });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await updateProduct({ id, ...state });
      push('/');
    } catch (error) {
      console.log(error);
      throw new Error('Error');
    }
  };

  useEffect(() => {
    return setState(initialState);
  }, [product]);

  return (
    <div>
      <div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <label htmlFor="title">
            <p>Title</p>
            <input
              type="text"
              value={state?.title}
              id="title"
              name="title"
              onChange={(e) => handleChange(e)}
            />
          </label>
          <label htmlFor="price">
            <p>Price</p>
            <input
              type="number"
              value={state?.price}
              id="price"
              name="price"
              onChange={handleChange}
            />
          </label>
          <label htmlFor="description">
            <p>Description</p>
            <textarea
              value={state?.description}
              id="description"
              name="description"
              onChange={handleChange}
            />
          </label>
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
};
