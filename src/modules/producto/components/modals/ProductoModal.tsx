import type { CreateProducto } from "../../types/IProducto";
import ProductoForm from "../forms/ProductoForm";
import Modal from "../../../../shared/ui/Modal";

type Props = {
  productoActivo: CreateProducto | null;
  productoId: number | null;
  onClose: () => void;
  onCreate: (data: CreateProducto) => void;
  onUpdate: (id: number, data: CreateProducto) => void;
};

function ProductoModal({
  productoActivo,
  productoId,
  onClose,
  onCreate,
  onUpdate,
}: Props) {
  const isEdit = !!productoActivo;

  const handleSubmit = (values: CreateProducto) => {
    if (isEdit && productoId) {
      onUpdate(productoId, values);
    } else {
      onCreate(values);
    }

    onClose();
  };

  return (
    <Modal
      onClose={onClose}
      title={isEdit ? "Editar producto" : "Nuevo producto"}
    >
      <ProductoForm
        defaultValues={productoActivo ?? undefined}
        onSubmit={handleSubmit}
      />
    </Modal>
  );
}

export default ProductoModal;
