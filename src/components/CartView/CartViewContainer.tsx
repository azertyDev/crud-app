import { useParams } from "react-router";
import { useGetProductByIdQuery } from "../../services/ProductService";

export const CartViewContainer = () => {
  const { id } = useParams() as {
    id: string;
  };

  const { data, isLoading, error } = useGetProductByIdQuery(id);

  return <div>{data?.title}</div>;
};
