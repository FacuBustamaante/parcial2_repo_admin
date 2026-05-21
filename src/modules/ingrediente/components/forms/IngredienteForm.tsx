import { useForm } from "@tanstack/react-form";
import type { CreateIngrediente } from "../../types/IIngrediente";
import { validateNombre, validateDescripcion } from "../../../../shared/helpers/validators";
import styles from "./IngredienteForm.module.css"

type Props = {
  defaultValues?: CreateIngrediente;
  onSubmit: (values: {
    nombre: string;
    descripcion: string;
    es_alergeno: boolean;
  }) => void;
};

/*
 ── Ingrediente FORM CREATE / UPDATE ───────────────────────────────────────────────────

Recibe defaultValues (para precargar datos al editar) y un onSubmit que le pasa los valores al componente padre. Internamente, useForm controla los inputs mediante form.Field, lo que evita manejar estado manual con useState.

Funcionamiento: inicializa valores (vacíos o precargados), cada campo se vincula al estado del form (field.state.value), y cuando el usuario envía el formulario, form.handleSubmit() ejecuta el onSubmit con un objeto limpio listo para usar (crear o actualizar). El form no decide qué hacer con los datos, solo los recolecta y los entrega.

─────────────────────────────────────────────────────────────────────────────────────────
*/

function IngredienteForm({ defaultValues, onSubmit }: Props) {
  const form = useForm({
    defaultValues: {
      nombre: defaultValues?.nombre ?? "",
      descripcion: defaultValues?.descripcion ?? "",
      es_alergeno: defaultValues?.es_alergeno ?? false,
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

    <form.Field name="es_alergeno">
      {(field) => (
        <div className={styles.checkboxField}>
          <input
            id="es_alergeno"
            type="checkbox"
            checked={field.state.value}
            onChange={(e) => field.handleChange(e.target.checked)}
          />
          <label htmlFor="es_alergeno">Es alérgeno</label>
        </div>
      )}
    </form.Field>

    <button type="submit" className={styles.button}>
      Guardar
    </button>
  </form>
);
}

export default IngredienteForm;
