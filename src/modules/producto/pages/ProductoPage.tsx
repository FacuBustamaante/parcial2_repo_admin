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
import { mapProductoToForm } from "../helpers/mapper/ProductoMapper";

function ProductoPage() {
  const queryClient = useQueryClient();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productoActivo, setProductoActivo] = useState<CreateProducto | null>(null);
  const [productoId, setProductoId] = useState<number | null>(null);

  const { data: productos = [], isLoading } = useQuery({
    queryKey: ["productos"],
    queryFn: listProductos,
    staleTime: 1000 * 60 * 5,
  });

  const createMutation = useMutation({
    mutationFn: createProducto,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["productos"] });
      setIsModalOpen(false);
    },
    onError: (error) => {
      Swal.fire("Error", error.message || "Ocurrió un error", "error");
    },
  });

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

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteProducto(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["productos"] });
      Swal.fire("Eliminado", "El producto ha sido eliminado", "success");
    },
  });

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

  const handleCreate = (data: CreateProducto) => createMutation.mutate(data);

  const handleUpdate = (id: number, data: CreateProducto) =>
    updateMutation.mutate({ id, producto: data });

  const handleDelete = (id: number) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esta acción",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) deleteMutation.mutate(id);
    });
  };

  if (isLoading)
    return (
      <div className="flex min-h-screen items-center justify-center bg-(--bg)">
        <ClipLoader color="var(--gold)" size={36} />
      </div>
    );

  return (
    <div className="flex min-h-screen bg-(--bg)">
      <Navbar onCreate={handleOpenCreate} />

      <main className="flex-1 ml-64 p-8">
        <div className="mb-8">
          <p className="sans text-xs text-(--text-faint) uppercase tracking-widest mb-1">Gestión</p>
          <h1 className="serif text-3xl font-semibold text-(--text)">Productos</h1>
        </div>

        <div className="bg-(--surface) border border-(--line) rounded-(--r-lg) overflow-hidden animate-fade-in-up">
          <table className="w-full">
            <thead>
              <tr className="border-b border-(--line)">
                {["#", "Nombre", "Precio", "Stock", "Acciones"].map((h) => (
                  <th key={h} className="px-5 py-3 text-left sans text-xs font-medium text-(--text-faint) uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {productos.map((p, index) => (
                <tr key={p.id} className="border-b border-(--line) last:border-0 hover:bg-(--surface-2) transition-colors">
                  <td className="px-5 py-3.5 sans text-sm text-(--text-muted)">{index + 1}</td>
                  <td className="px-5 py-3.5 sans text-sm text-(--text) font-medium">{p.nombre}</td>
                  <td className="px-5 py-3.5 sans text-sm text-(--gold)">${p.precio_base}</td>
                  <td className="px-5 py-3.5 sans text-sm text-(--text-muted)">{p.stock_cantidad}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOpenEdit(p)}
                        className="sans text-xs px-3 py-1.5 rounded-(--r-sm) border border-(--line-strong) text-(--text-muted) hover:border-(--gold) hover:text-(--gold) transition-colors"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="sans text-xs px-3 py-1.5 rounded-(--r-sm) border border-red-500/20 text-red-400 hover:border-red-500/40 hover:text-red-300 transition-colors"
                      >
                        Eliminar
                      </button>
                    </div>
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
          <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
            <ClipLoader color="var(--gold)" size={36} />
          </div>
        )}
      </main>
    </div>
  );
}

export default ProductoPage;
