import { FormEvent, useState } from "react";
import { useParams } from "react-router";
import { IProduct } from "src/models/IProduct";
import {
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "src/services/ProductService";

export const EditableProduct = () => {
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

  const [state, setState] = useState(initialState);
  console.log(state);

  const handleChange = ({
    target: { value, name },
  }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setState({ ...state, [name]: value });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updateProduct({id, state});
    } catch (error) {
      throw new Error("Error");
    }
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
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
