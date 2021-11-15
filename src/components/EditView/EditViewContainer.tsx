import { IProduct } from "src/models/IProduct";
import { useUpdateProductMutation } from "src/services/ProductService";
import { EditableProduct } from "./EditableProduct";

export const EditViewContainer = () => {
  const [updateProduct, {}] = useUpdateProductMutation();

  const handleUpdate = async (product: IProduct) => {
    try {
      await updateProduct(product);
    } catch (e) {}
  };

  return (
    <div>
      <EditableProduct onUpdate={handleUpdate} />
    </div>
  );
};
