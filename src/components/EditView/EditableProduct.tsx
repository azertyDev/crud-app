import { FC, FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router";
import { IProduct } from "src/models/IProduct";
import {
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "src/services/ProductService";

type EditableProductPropsType = {
  onUpdate: (product: IProduct) => void;
};

export const EditableProduct: FC<EditableProductPropsType> = ({ onUpdate }) => {
  const { id } = useParams<{ id: any }>();
  const { data: product } = useGetProductByIdQuery(id);
  const [updateProduct, {}] = useUpdateProductMutation();

  const initialState: IProduct = {
    title: product?.title,
    description: product?.description,
    price: product?.price,
    id: product?.id,
    inCart: product?.inCart,
  };

  const [state, setState] = useState({});

  const handleChange = ({
    target: { value, name },
  }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setState({ ...state, [name]: value });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await updateProduct({ id, ...state });
      setState({ ...state, [e.currentTarget.name]: e.currentTarget.value });
      console.log(state);
    } catch (error) {
      throw new Error("Error");
    }
  };

  useEffect(() => {
    return setState(initialState);
  }, [product]);

  console.log(state);

  return (
    <div>
      <div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <label htmlFor="title">
            <p>Title</p>
            <input
              type="text"
              value={product?.title}
              id="title"
              name="title"
              onChange={(e) => handleChange(e)}
            />
          </label>
          <label htmlFor="price">
            <p>Price</p>
            <input
              type="number"
              value={product?.price}
              id="price"
              name="price"
              onChange={handleChange}
            />
          </label>
          <label htmlFor="description">
            <p>Description</p>
            <textarea
              value={product?.description}
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
