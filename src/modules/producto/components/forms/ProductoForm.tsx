import { useForm } from "@tanstack/react-form";
import { useEffect } from "react";
import type { CreateProducto } from "../../types/IProducto";

import {
  validateNombre,
  validateDescripcion,
  validateImgList,
  validateIdList,
} from "../../../../shared/helpers/validators";

import styles from "./ProductoForm.module.css";

/** 
── Producto FORM───────────────────────────────────────────────────────────────────────────────────────

El ProductoForm implementa una lógica más compleja que el CategoriaForm o Ingrediente form porque maneja estructuras compuestas y relaciones. El formulario administra arrays (imagenes_url, categoria_ids, ingrediente_ids) y tipos mixtos como booleanos y números. Para resolver esto, se normalizan los datos de entrada y salida, transformando inputs de texto (por ejemplo, “1,2,3”) en arrays de números, lo que permite adaptarlos al modelo del backend sin perder flexibilidad en la UI.

Otra diferencia clave es el manejo de estados iniciales y edición. En este formulario se utiliza un useEffect para hacer form.reset(defaultValues) cada vez que cambia el producto activo, lo que permite reutilizar el mismo componente tanto para crear como para editar productos.

El producto tiene relaciones N:N con categorías e ingredientes. Esto obliga a que el frontend haga parte del trabajo de “adaptación de datos” (parsing y validación básica), mientras que en CategoriaForm no existe esa necesidad porque el modelo es más plano. En resumen, ProductoForm no solo captura datos, sino que también actúa como una capa intermedia que prepara información estructurada para el backend.

────────────────────────────────────────────────────────────────────────────────────────────────────────
*/

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
    onSubmit: async ({ value }) => {
      onSubmit(value);
    },
  });

  useEffect(() => {
    if (defaultValues) {
      form.reset(defaultValues);
    } else {
      form.reset(emptyValues);
    }
  }, [defaultValues]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className={styles.form}
    >
      <form.Field name="nombre" validators={{ onChange: validateNombre }}>
        {(field) => (
          <div className={styles.field}>
            <label htmlFor="nombre">Nombre</label>
            <input
              id="nombre"
              className={styles.input}
              placeholder="Nombre"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
            />
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
              className={styles.input}
              placeholder="Descripción"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
            />
          </div>
        )}
      </form.Field>

      <form.Field
        name="imagenes_url"
        validators={{ onChange: validateImgList }}
      >
        {(field) => (
          <div className={styles.field}>
            <label htmlFor="imagenes_url">Imágenes</label>
            <input
              id="imagenes_url"
              className={styles.input}
              placeholder="URLs separadas por coma"
              value={(field.state.value ?? []).join(",")}
              onChange={(e) =>
                field.handleChange(
                  e.target.value.split(",").map((url) => url.trim()),
                )
              }
            />
          </div>
        )}
      </form.Field>

      <form.Field name="precio_base">
        {(field) => (
          <div className={styles.field}>
            <label htmlFor="precio_base">Precio base</label>
            <input
              id="precio_base"
              type="number"
              className={styles.input}
              placeholder="Precio base"
              value={field.state.value}
              onChange={(e) => field.handleChange(Number(e.target.value))}
            />
          </div>
        )}
      </form.Field>

      <form.Field name="stock_cantidad">
        {(field) => (
          <div className={styles.field}>
            <label htmlFor="stock_cantidad">Stock</label>
            <input
              id="stock_cantidad"
              type="number"
              className={styles.input}
              placeholder="Stock"
              value={field.state.value}
              onChange={(e) => field.handleChange(Number(e.target.value))}
            />
          </div>
        )}
      </form.Field>

      <form.Field name="disponible">
        {(field) => (
          <div className={styles.checkboxField}>
            <input
              id="disponible"
              type="checkbox"
              checked={field.state.value}
              onChange={(e) => field.handleChange(e.target.checked)}
            />
            <label htmlFor="disponible">Disponible</label>
          </div>
        )}
      </form.Field>

      <form.Field
        name="categoria_ids"
        validators={{ onChange: validateIdList }}
      >
        {(field) => (
          <div className={styles.field}>
            <label htmlFor="categoria_ids">Categorías</label>
            <input
              id="categoria_ids"
              className={styles.input}
              placeholder="IDs (ej: 1,2)"
              value={(field.state.value ?? []).join(",")}
              onChange={(e) =>
                field.handleChange(
                  e.target.value
                    .split(",")
                    .map((id) => Number(id.trim()))
                    .filter((n) => !isNaN(n)),
                )
              }
            />
          </div>
        )}
      </form.Field>

      <form.Field
        name="ingrediente_ids"
        validators={{ onChange: validateIdList }}
      >
        {(field) => (
          <div className={styles.field}>
            <label htmlFor="ingrediente_ids">Ingredientes</label>
            <input
              id="ingrediente_ids"
              className={styles.input}
              placeholder="IDs (ej: 1,2)"
              value={(field.state.value ?? []).join(",")}
              onChange={(e) =>
                field.handleChange(
                  e.target.value
                    .split(",")
                    .map((id) => Number(id.trim()))
                    .filter((n) => !isNaN(n)),
                )
              }
            />
          </div>
        )}
      </form.Field>

      <button type="submit" className={styles.button}>
        Guardar
      </button>
    </form>
  );
}

export default ProductoForm;
