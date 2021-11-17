import { useState } from 'react';
import { useHistory } from 'react-router';
import { IProduct } from 'src/models/IProduct';
import {
  useAddToCartMutation,
  useDeleteProductMutation,
  useFetchAllProductsQuery,
} from '../../../services/ProductService';
import { ProductCart } from '../../common/ProductCart/ProductCart';
import './MainView.css';

export const MainViewContainer = () => {
  const [limit, setLimit] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { push } = useHistory();

  const {
    data: products,
    isFetching,
    error,
  } = useFetchAllProductsQuery({ limit, currentPage });
  const [addToCart, {}] = useAddToCartMutation();
  const [deleteProduct, {}] = useDeleteProductMutation();

  const handleDelete = (id: string) => {
    deleteProduct(id);
  };

  const handleUpdate = (id: string) => {
    push(`/products/${id}`);
  };

  const handleAddToCart = async (product: IProduct) => {
    await addToCart(product);
  };

  // const [searchTerm, setSearchTerm] = useState<string>("");
  // const [searchResult, setSearchResult] = useState<string>("");

  // const {
  //   deleteProduct,
  //   {}
  // } = useDeleteProductMutation();

  // const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
  //   setSearchTerm(event.target.value);
  // };

  // const handleSearch = () => {
  //   const foundItems = products?.filter((item) =>
  //     item.title.toLowerCase().includes(searchTerm.toLowerCase())
  //   );
  //   setSearchResult(foundItems);
  // };

  return (
    <div className="main-view">
      {/* <div className="wrapper">
        <label htmlFor="title">
          <p>Search blog posts</p>
        </label>
        <input
          type="text"
          onChange={(e) => handleInput(e)}
          placeholder="Filter"
          name="title"
          id="title"
        />
        <button onClick={handleSearch}>Search</button>
      </div> */}

      {isFetching && <h1>Loading...</h1>}
      {error && <h1>Oops...Error has occured</h1>}
      <div className="cards">
        {products?.map((product) => (
          <ProductCart
            key={product.id}
            product={product}
            handleAddToCart={handleAddToCart}
            handleDelete={handleDelete}
            handleUpdate={handleUpdate}
          />
        ))}
      </div>
      <div className="pagination">
        <button
          onClick={() => setCurrentPage((prev) => prev - 1)}
          disabled={currentPage === 1}
        >
          -
        </button>
        <button onClick={() => setCurrentPage((prev) => prev + 1)}>+</button>
      </div>
    </div>
  );
};
