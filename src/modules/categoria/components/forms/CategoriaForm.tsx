import { useForm } from "@tanstack/react-form";
import type { CreateCategoria } from "../../types/ICategoria";
import {
  validateNombre,
  validateDescripcion,
  validateImg,
  validateNumberId
} from "../../../../shared/helpers/validators";
import styles from "./CategoriaForm.module.css"

/**
 ─────────────────────────────────────────────────────────────────────────────────────────
 Este componente CategoriaForm define un formulario controlado usando el hook useForm de TanStack React Form para manejar el estado, validaciones y envío de datos de una categoría. Recibe opcionalmente defaultValues (para casos de edición) y una función onSubmit que se ejecuta al enviar el formulario. En la configuración del hook, se inicializan los valores de los campos (nombre, descripcion, img_url y parent_id) asegurando valores por defecto coherentes (strings vacíos o null). Cuando el usuario envía el formulario, se previene el comportamiento por defecto del navegador y se delega el manejo a form.handleSubmit, que finalmente ejecuta onSubmit con los valores actuales.

En la interfaz, cada campo se gestiona mediante form.Field, lo que permite conectar el input con el estado interno del formulario y aplicar validaciones en tiempo real (validateNombre, validateDescripcion, validateId). Los inputs de texto (nombre, descripcion, img_url) manejan directamente strings, mientras que parent_id requiere una conversión especial: como el input devuelve strings, se transforma a number o null antes de actualizar el estado, manteniendo coherencia con el modelo de datos. En conjunto, el componente encapsula la lógica de captura, validación y envío de datos, pudiendo reutilizarse tanto para crear como para editar categorías.
─────────────────────────────────────────────────────────────────────────────────────────
 */

type Props = {
  defaultValues?: CreateCategoria;
  onSubmit: (values: {
    nombre: string;
    descripcion: string;
    imagen_url: string;
    parent_id: number | null;
  }) => void;
};

function CategoriaForm({ defaultValues, onSubmit }: Props) {
  const form = useForm({
    defaultValues: {
      nombre: defaultValues?.nombre ?? "",
      descripcion: defaultValues?.descripcion ?? "",
      imagen_url: defaultValues?.imagen_url ?? "",
      parent_id: defaultValues?.parent_id ?? null,
    },
    onSubmit: async ({ value }) => {
      onSubmit(value);
    },
  });

    return (
  <form
    onSubmit={(e) => {
      e.preventDefault();
      form.handleSubmit();
    }}
    className={styles.form}
  >
    {/* NOMBRE */}
    <form.Field
      name="nombre"
      validators={{ onChange: validateNombre }}
    >
      {(field) => (
        <div className={styles.field}>
          <label htmlFor="nombre">Nombre</label>
          <input
            id="nombre"
            className={`${styles.input} ${
              field.state.meta.errors.length ? styles.error : ""
            }`}
            placeholder="Nombre"
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
          />
          {field.state.meta.errors[0] && (
            <span className={styles.errorText}>
              {field.state.meta.errors[0]}
            </span>
          )}
        </div>
      )}
    </form.Field>

    {/* DESCRIPCIÓN */}
    <form.Field
      name="descripcion"
      validators={{ onChange: validateDescripcion }}
    >
      {(field) => (
        <div className={styles.field}>
          <label htmlFor="descripcion">Descripción</label>
          <input
            id="descripcion"
            className={`${styles.input} ${
              field.state.meta.errors.length ? styles.error : ""
            }`}
            placeholder="Descripción"
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
          />
          {field.state.meta.errors[0] && (
            <span className={styles.errorText}>
              {field.state.meta.errors[0]}
            </span>
          )}
        </div>
      )}
    </form.Field>

    {/* IMG */}
    <form.Field
      name="imagen_url"
      validators={{ onChange: validateImg }}
    >
      {(field) => (
        <div className={styles.field}>
          <label htmlFor="imagen_url">Imagen URL</label>
          <input
            id="imagen_url"
            className={`${styles.input} ${
              field.state.meta.errors.length ? styles.error : ""
            }`}
            placeholder="Imagen URL"
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
          />
          {field.state.meta.errors[0] && (
            <span className={styles.errorText}>
              {field.state.meta.errors[0]}
            </span>
          )}
        </div>
      )}
    </form.Field>

    {/* PARENT ID */}
    <form.Field
      name="parent_id"
      validators={{ onChange: validateNumberId }}
    >
      {(field) => (
        <div className={styles.field}>
          <label htmlFor="parent_id">Categoría padre (ID)</label>
          <input
            id="parent_id"
            className={`${styles.input} ${
              field.state.meta.errors.length ? styles.error : ""
            }`}
            placeholder="Parent ID"
            value={field.state.value ?? ""}
            onChange={(e) => {
              const value = e.target.value;
              field.handleChange(value === "" ? null : Number(value));
            }}
          />
          {field.state.meta.errors[0] && (
            <span className={styles.errorText}>
              {field.state.meta.errors[0]}
            </span>
          )}
        </div>
      )}
    </form.Field>

    <button type="submit" className={styles.button}>
      Guardar
    </button>
  </form>
);

}

export default CategoriaForm;
