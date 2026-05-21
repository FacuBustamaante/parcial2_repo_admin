import type { ICategoria, CreateCategoria } from "../../types/ICategoria";
import CategoriaForm from "../forms/CategoriaForm";
import Modal from "../../../../shared/ui/Modal";

type Props = {
  categoriaActivo: ICategoria | null;
  onClose: () => void;
  onCreate: (data: CreateCategoria) => void;
  onUpdate: (id: number, data: CreateCategoria) => void;
};

function CategoriaModal({
  categoriaActivo,
  onClose,
  onCreate,
  onUpdate,
}: Props) {
  const isEdit = !!categoriaActivo;

  const handleSubmit = (values: CreateCategoria) => {
    if (isEdit && categoriaActivo) {
      onUpdate(categoriaActivo.id, values);
    } else {
      onCreate(values);
    }

    onClose();
  };

  return (
    <Modal
      onClose={onClose}
      title={isEdit ? "Editar categoría" : "Nueva categoría"}
    >
      <CategoriaForm
        defaultValues={categoriaActivo ?? undefined}
        onSubmit={handleSubmit}
      />
    </Modal>
  );
}

export default CategoriaModal;