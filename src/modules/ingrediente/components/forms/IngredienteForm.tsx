import { useForm } from "@tanstack/react-form";
import type { CreateIngrediente } from "../../types/IIngrediente";
import { validateNombre, validateDescripcion } from "../../../../shared/helpers/validators";

const inputClass =
  "w-full bg-(--surface-3) border border-(--line-strong) rounded-(--r-md) px-3 py-2 sans text-sm text-(--text) placeholder:text-(--text-faint) focus:outline-none focus:border-(--gold) focus:ring-1 focus:ring-(--gold) transition-colors";
const labelClass = "sans text-sm font-medium text-(--text-muted)";
const errorClass = "sans text-xs text-red-400 mt-0.5";

type Props = {
  defaultValues?: CreateIngrediente;
  onSubmit: (values: { nombre: string; descripcion: string; es_alergeno: boolean }) => void;
};

function IngredienteForm({ defaultValues, onSubmit }: Props) {
  const form = useForm({
    defaultValues: {
      nombre: defaultValues?.nombre ?? "",
      descripcion: defaultValues?.descripcion ?? "",
      es_alergeno: defaultValues?.es_alergeno ?? false,
    },
    onSubmit: async ({ value }) => onSubmit(value),
  });

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); form.handleSubmit(); }}
      className="space-y-4"
    >
      <form.Field name="nombre" validators={{ onChange: validateNombre }}>
        {(field) => (
          <div className="flex flex-col gap-1">
            <label htmlFor="nombre" className={labelClass}>Nombre</label>
            <input
              id="nombre"
              className={`${inputClass} ${field.state.meta.errors.length ? "border-red-500/40" : ""}`}
              placeholder="Nombre"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
            />
            {field.state.meta.errors[0] && (
              <span className={errorClass}>{field.state.meta.errors[0]}</span>
            )}
          </div>
        )}
      </form.Field>

      <form.Field name="descripcion" validators={{ onChange: validateDescripcion }}>
        {(field) => (
          <div className="flex flex-col gap-1">
            <label htmlFor="descripcion" className={labelClass}>Descripción</label>
            <input
              id="descripcion"
              className={`${inputClass} ${field.state.meta.errors.length ? "border-red-500/40" : ""}`}
              placeholder="Descripción"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
            />
            {field.state.meta.errors[0] && (
              <span className={errorClass}>{field.state.meta.errors[0]}</span>
            )}
          </div>
        )}
      </form.Field>

      <form.Field name="es_alergeno">
        {(field) => (
          <label className="flex items-center gap-2.5 cursor-pointer">
            <input
              id="es_alergeno"
              type="checkbox"
              checked={field.state.value}
              onChange={(e) => field.handleChange(e.target.checked)}
              className="accent-(--gold) w-4 h-4"
            />
            <span className="sans text-sm text-(--text-muted)">Es alérgeno</span>
          </label>
        )}
      </form.Field>

      <button
        type="submit"
        className="w-full bg-(--gold) text-(--gold-contrast) font-semibold sans rounded-(--r-md) py-2.5 text-sm hover:bg-(--gold-deep) transition-colors mt-2"
      >
        Guardar
      </button>
    </form>
  );
}

export default IngredienteForm;
