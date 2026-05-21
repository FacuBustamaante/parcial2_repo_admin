import type { IIngrediente, CreateIngrediente } from "../../types/IIngrediente";
import IngredienteForm from "../forms/IngredienteForm";
import Modal from "../../../../shared/ui/Modal";

/*
 ── Ingrediente MODAL ───────────────────────────────────────────────────

envuelve el formulario y decide si se está creando o editando un ingrediente. Recibe ingredienteActivo (si existe → modo edición, si no → creación) y funciones onCreate y onUpdate que vienen del componente padre (donde viven las mutations o lógica real).

Se renderiza el modal con el IngredienteForm, le pasa valores iniciales si se está editando, y cuando el form envía datos, el modal decide qué acción ejecutar (onCreate o onUpdate). Después de eso, cierra el modal. En resumen: el modal maneja el flujo y la intención, mientras que el form solo maneja los datos.
─────────────────────────────────────────────────────────────────────────────────────────
*/

type Props = {
  ingredienteActivo: IIngrediente | null;
  onClose: () => void;
  onCreate: (data: CreateIngrediente) => void;
  onUpdate: (id: number, data: CreateIngrediente) => void;
};

function IngredienteModal({
  ingredienteActivo,
  onClose,
  onCreate,
  onUpdate,
}: Props) {
  const isEdit = !!ingredienteActivo;

  const handleSubmit = (values: CreateIngrediente) => {
    if (isEdit && ingredienteActivo) {
      onUpdate(ingredienteActivo.id, values);
    } else {
      onCreate(values);
    }

    onClose();
  };

  return (
    <Modal
      onClose={onClose}
      title={isEdit ? "Editar ingrediente" : "Nuevo Ingredeinte"}
    >
      <IngredienteForm
        defaultValues={ingredienteActivo ?? undefined}
        onSubmit={handleSubmit}
      />
    </Modal>
  );
}

export default IngredienteModal;
