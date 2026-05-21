import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { CreateProducto, IProducto } from "../types/IProducto";
import { useState } from "react";
import {
  createProducto,
  deleteProducto,
  listProductos,
  updateProducto,
} from "../service/producto.service";

import ProductoModal from "../components/modals/ProductoModal";
import Navbar from "../../../shared/layout/NavBar";

import Swal from "sweetalert2";
import { ClipLoader } from "react-spinners";

import styles from "./ProductoPage.module.css";
// ───────────────────────────────────────────────────────────────────────────────────────
//Implemento un mapper en el producto para desacoplar el modelo de base de datos de la representación que consumen el frontend y la API, evitando exponer directamente estructuras internas como las relaciones de SQLAlchemy. Esto te permite transformar el Producto a un formato controlado (ProductoPublic) donde decido explícitamente qué datos enviar (como IDs o entidades completas), garantizando consistencia en la respuesta, mejorando la mantenibilidad del código y facilitando cambios futuros en el modelo sin romper el contrato con el frontend.
// ───────────────────────────────────────────────────────────────────────────────────────

import { mapProductoToForm } from "../helpers/mapper/ProductoMapper";

function ProductoPage() {
  const queryClient = useQueryClient();

  // ── Modal ────────────────────────────
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productoActivo, setProductoActivo] = useState<CreateProducto | null>(
    null,
  ); //IProducto
  const [productoId, setProductoId] = useState<number | null>(null);

  // ── GET ────────────────────────────
  const { data: productos = [], isLoading } = useQuery({
    queryKey: ["productos"],
    queryFn: listProductos,
    staleTime: 1000 * 60 * 5,
  });

  // ── CREATE ─────────────────────────
  const createMutation = useMutation({
    mutationFn: createProducto,
    onSuccess: () => {
      //invalidación del cache -> useQuery actualiza la tabla
      queryClient.invalidateQueries({ queryKey: ["productos"] });
      setIsModalOpen(false);
    },
    onError: (error) => {
      Swal.fire("Error", error.message || "Ocurrió un error", "error");
    },
  });

  // ── UPDATE ─────────────────────────
  const updateMutation = useMutation({
    mutationFn: ({ id, producto }: { id: number; producto: CreateProducto }) =>
      updateProducto(id, producto),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["productos"] });
    },
    onError: (error) => {
      Swal.fire("Error", error.message || "Ocurrió un error", "error");
    },
  });

  // ── DELETE ─────────────────────────
  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteProducto(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["productos"] });
      Swal.fire("Eliminado", "El producto ha sido eliminado", "success");
    },
  });

  // ── HANDLERS ───────────────────────
  const handleOpenCreate = () => {
    setProductoActivo(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (producto: IProducto) => {
    setProductoId(producto.id);
    setProductoActivo(mapProductoToForm(producto));
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setProductoActivo(null);
  };

  const handleCreate = (data: CreateProducto) => {
    createMutation.mutate(data);
  };

  const handleUpdate = (id: number, data: CreateProducto) => {
    updateMutation.mutate({ id, producto: data });
  };

  const handleDelete = (id: number) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esta acción",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  // ── LOADING ───────────────────────
  if (isLoading)
    return (
      <div className={styles.loaderContainer}>
        <ClipLoader />
      </div>
    );

  // ── UI ────────────────────────────
  return (
    <div>
      <Navbar onCreate={handleOpenCreate} />

      <div className={styles.container}>
        <h1 className={styles.title}>Productos</h1>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {productos.map((p, index) => (
                <tr key={p.id}>
                  <td>{index + 1}</td>
                  <td>{p.nombre}</td>
                  <td>${p.precio_base}</td>
                  <td>{p.stock_cantidad}</td>

                  <td className={styles.actions}>
                    <button
                      onClick={() => handleOpenEdit(p)}
                      className={styles.editButton}
                    >
                      Editar
                    </button>

                    <button
                      onClick={() => handleDelete(p.id)}
                      className={styles.deleteButton}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {isModalOpen && (
          <ProductoModal
            productoActivo={productoActivo}
            productoId={productoId}
            onClose={handleCloseModal}
            onCreate={handleCreate}
            onUpdate={handleUpdate}
          />
        )}

        {(createMutation.isPending || updateMutation.isPending) && (
          <div className={styles.loaderContainer}>
            <ClipLoader />
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductoPage;
