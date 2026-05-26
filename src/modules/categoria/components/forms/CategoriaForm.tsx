import { useForm } from "@tanstack/react-form";
import type { CreateCategoria } from "../../types/ICategoria";
import {
  validateNombre,
  validateDescripcion,
  validateImg,
  validateNumberId,
} from "../../../../shared/helpers/validators";

const inputClass =
  "w-full bg-(--surface-3) border border-(--line-strong) rounded-(--r-md) px-3 py-2 sans text-sm text-(--text) placeholder:text-(--text-faint) focus:outline-none focus:border-(--gold) focus:ring-1 focus:ring-(--gold) transition-colors";
const labelClass = "sans text-sm font-medium text-(--text-muted)";
const errorClass = "sans text-xs text-red-400 mt-0.5";

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

      <form.Field name="imagen_url" validators={{ onChange: validateImg }}>
        {(field) => (
          <div className="flex flex-col gap-1">
            <label htmlFor="imagen_url" className={labelClass}>Imagen URL</label>
            <input
              id="imagen_url"
              className={`${inputClass} ${field.state.meta.errors.length ? "border-red-500/40" : ""}`}
              placeholder="https://..."
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
            />
            {field.state.meta.errors[0] && (
              <span className={errorClass}>{field.state.meta.errors[0]}</span>
            )}
          </div>
        )}
      </form.Field>

      <form.Field name="parent_id" validators={{ onChange: validateNumberId }}>
        {(field) => (
          <div className="flex flex-col gap-1">
            <label htmlFor="parent_id" className={labelClass}>Categoría padre (ID)</label>
            <input
              id="parent_id"
              className={`${inputClass} ${field.state.meta.errors.length ? "border-red-500/40" : ""}`}
              placeholder="Dejar vacío si es principal"
              value={field.state.value ?? ""}
              onChange={(e) => {
                const value = e.target.value;
                field.handleChange(value === "" ? null : Number(value));
              }}
            />
            {field.state.meta.errors[0] && (
              <span className={errorClass}>{field.state.meta.errors[0]}</span>
            )}
          </div>
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

export default CategoriaForm;
