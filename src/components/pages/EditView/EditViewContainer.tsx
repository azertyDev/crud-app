import { EditableProduct } from './EditableProduct';
import { useGetProductByIdQuery } from '../../../services/ProductService';
import { useParams } from 'react-router';

export const EditViewContainer = () => {
  const { id } = useParams<{ id: any }>();
  const { data: product } = useGetProductByIdQuery(id);

  return (
    <div>
      <EditableProduct product={product} id={id} />
    </div>
  );
};
