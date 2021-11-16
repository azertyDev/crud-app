import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useCreateProductMutation } from '../../../services/ProductService';

type initialStateType = {
  title: string;
  description: string;
  price: number;
};

export const CreateViewContainer = () => {
  const initialState: initialStateType = {
    title: '',
    description: '',
    price: 0,
  };

  const [state, setState] = useState(initialState);

  const history = useHistory();

  const [createProduct, { status }] = useCreateProductMutation();

  const handleInput = (
    e: ChangeEvent<HTMLInputElement & HTMLTextAreaElement>,
  ) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createProduct(state);

      history.push('/');
      if (status === 'uninitialized') {
        setState({
          title: '',
          description: '',
          price: 0,
        });
      }
    } catch (error) {
      throw new Error('Error');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">
          <p>Title</p>
          <input
            type="text"
            value={state.title}
            id="title"
            name="title"
            onChange={handleInput}
          />
        </label>
        <label htmlFor="price">
          <p>Price</p>
          <input
            type="number"
            value={state.price}
            id="price"
            name="price"
            onChange={handleInput}
          />
        </label>
        <label htmlFor="description">
          <p>Description</p>
          <textarea
            value={state.description}
            id="description"
            name="description"
            onChange={handleInput}
          />
        </label>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};
