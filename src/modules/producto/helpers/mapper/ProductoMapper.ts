import type { IProducto, CreateProducto } from "../../types/IProducto";

// Función para mapear un producto a un formato adecuado para el formulario de creación/edición

export const mapProductoToForm = (producto: IProducto): CreateProducto => ({
  nombre: producto.nombre,
  descripcion: producto.descripcion,
  precio_base: producto.precio_base,
  imagenes_url: producto.imagenes_url,
  stock_cantidad: producto.stock_cantidad,
  disponible: producto.disponible,
  categoria_ids: producto.categorias.map(c => c.id),
  ingrediente_ids: producto.ingredientes.map(i => i.id),
});