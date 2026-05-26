import { useForm } from "@tanstack/react-form";
import { useEffect } from "react";
import type { CreateProducto } from "../../types/IProducto";
import {
  validateNombre,
  validateDescripcion,
  validateImgList,
  validateIdList,
} from "../../../../shared/helpers/validators";

const inputClass =
  "w-full bg-(--surface-3) border border-(--line-strong) rounded-(--r-md) px-3 py-2 sans text-sm text-(--text) placeholder:text-(--text-faint) focus:outline-none focus:border-(--gold) focus:ring-1 focus:ring-(--gold) transition-colors";
const labelClass = "sans text-sm font-medium text-(--text-muted)";

type Props = {
  defaultValues?: CreateProducto;
  onSubmit: (values: CreateProducto) => void;
};

function ProductoForm({ defaultValues, onSubmit }: Props) {
  const emptyValues: CreateProducto = {
    nombre: "",
    descripcion: "",
    imagenes_url: [],
    precio_base: 0,
    stock_cantidad: 0,
    disponible: true,
    categoria_ids: [],
    ingrediente_ids: [],
  };

  const form = useForm({
    defaultValues: emptyValues,
    onSubmit: async ({ value }) => onSubmit(value),
  });

  useEffect(() => {
    form.reset(defaultValues ?? emptyValues);
  }, [defaultValues]);

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
              className={inputClass}
              placeholder="Nombre"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
            />
          </div>
        )}
      </form.Field>

      <form.Field name="descripcion" validators={{ onChange: validateDescripcion }}>
        {(field) => (
          <div className="flex flex-col gap-1">
            <label htmlFor="descripcion" className={labelClass}>Descripción</label>
            <input
              id="descripcion"
              className={inputClass}
              placeholder="Descripción"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
            />
          </div>
        )}
      </form.Field>

      <form.Field name="imagenes_url" validators={{ onChange: validateImgList }}>
        {(field) => (
          <div className="flex flex-col gap-1">
            <label htmlFor="imagenes_url" className={labelClass}>Imágenes (URLs separadas por coma)</label>
            <input
              id="imagenes_url"
              className={inputClass}
              placeholder="https://img1.jpg, https://img2.jpg"
              value={(field.state.value ?? []).join(",")}
              onChange={(e) =>
                field.handleChange(e.target.value.split(",").map((url) => url.trim()))
              }
            />
          </div>
        )}
      </form.Field>

      <div className="grid grid-cols-2 gap-3">
        <form.Field name="precio_base">
          {(field) => (
            <div className="flex flex-col gap-1">
              <label htmlFor="precio_base" className={labelClass}>Precio base</label>
              <input
                id="precio_base"
                type="number"
                className={inputClass}
                placeholder="0"
                value={field.state.value}
                onChange={(e) => field.handleChange(Number(e.target.value))}
              />
            </div>
          )}
        </form.Field>

        <form.Field name="stock_cantidad">
          {(field) => (
            <div className="flex flex-col gap-1">
              <label htmlFor="stock_cantidad" className={labelClass}>Stock</label>
              <input
                id="stock_cantidad"
                type="number"
                className={inputClass}
                placeholder="0"
                value={field.state.value}
                onChange={(e) => field.handleChange(Number(e.target.value))}
              />
            </div>
          )}
        </form.Field>
      </div>

      <form.Field name="disponible">
        {(field) => (
          <label className="flex items-center gap-2.5 cursor-pointer">
            <input
              id="disponible"
              type="checkbox"
              checked={field.state.value}
              onChange={(e) => field.handleChange(e.target.checked)}
              className="accent-(--gold) w-4 h-4"
            />
            <span className="sans text-sm text-(--text-muted)">Disponible</span>
          </label>
        )}
      </form.Field>

      <form.Field name="categoria_ids" validators={{ onChange: validateIdList }}>
        {(field) => (
          <div className="flex flex-col gap-1">
            <label htmlFor="categoria_ids" className={labelClass}>Categorías (IDs: ej. 1,2)</label>
            <input
              id="categoria_ids"
              className={inputClass}
              placeholder="1, 2"
              value={(field.state.value ?? []).join(",")}
              onChange={(e) =>
                field.handleChange(
                  e.target.value.split(",").map((id) => Number(id.trim())).filter((n) => !isNaN(n))
                )
              }
            />
          </div>
        )}
      </form.Field>

      <form.Field name="ingrediente_ids" validators={{ onChange: validateIdList }}>
        {(field) => (
          <div className="flex flex-col gap-1">
            <label htmlFor="ingrediente_ids" className={labelClass}>Ingredientes (IDs: ej. 1,2)</label>
            <input
              id="ingrediente_ids"
              className={inputClass}
              placeholder="1, 2"
              value={(field.state.value ?? []).join(",")}
              onChange={(e) =>
                field.handleChange(
                  e.target.value.split(",").map((id) => Number(id.trim())).filter((n) => !isNaN(n))
                )
              }
            />
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

export default ProductoForm;
