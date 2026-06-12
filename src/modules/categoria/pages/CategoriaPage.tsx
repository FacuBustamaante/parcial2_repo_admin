import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ICategoria, CreateCategoria } from "../types/ICategoria";
import { FaPlus } from "react-icons/fa";
import {
   updateCategoria,
   createCategoria,
   deleteCategoria,
   listCategorias,
} from "../service/categoria.service";
import { useState } from "react";
import CategoriaModal from "../components/modals/CategoriaModal";
import Navbar from "../../../shared/layout/NavBar";
import Swal from "sweetalert2";
import { ClipLoader } from "react-spinners";

function CategoriaPage() {
   const queryClient = useQueryClient();

   const [isModalOpen, setIsModalOpen] = useState(false);
   const [categoriaActivo, setCategoriaActivo] = useState<ICategoria | null>(null);

   const { data: categorias = [], isLoading } = useQuery({
      queryKey: ["categorias"],
      queryFn: listCategorias,
      staleTime: 1000 * 60 * 5,
   });

   const createMutation = useMutation({
      mutationFn: createCategoria,
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ["categorias"] });
         setIsModalOpen(false);
      },
      onError: (error) => {
         Swal.fire({ icon: "error", title: "Error", text: error.message || "Ocurrió un error" });
      },
   });

   const updateMutation = useMutation({
      mutationFn: ({ id, categoria }: { id: number; categoria: CreateCategoria }) =>
         updateCategoria(id, categoria),
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ["categorias"] });
      },
      onError: (error) => {
         Swal.fire({ icon: "error", title: "Error", text: error.message || "Ocurrió un error" });
      },
   });

   const deleteMutation = useMutation({
      mutationFn: (id: number) => deleteCategoria(id),
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ["categorias"] });
         Swal.fire({ title: "Eliminado", text: "La categoría ha sido eliminada", icon: "success" });
      },
   });

   const handleOpenCreate = () => {
      setCategoriaActivo(null);
      setIsModalOpen(true);
   };

   const handleOpenEdit = (categoria: ICategoria) => {
      setCategoriaActivo(categoria);
      setIsModalOpen(true);
   };

   const handleCloseModal = () => {
      setIsModalOpen(false);
      setCategoriaActivo(null);
   };

   const handleCreate = (data: CreateCategoria) => createMutation.mutate(data);

   const handleUpdate = (id: number, data: CreateCategoria) =>
      updateMutation.mutate({ id, categoria: data });

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
      <div className="flex min-h-screen bg-(--bg) dark:bg-zinc-100">
         <Navbar onCreate={handleOpenCreate} />

         <main className="flex-1 ml-0 lg:ml-64 px-4 pt-16 pb-6 lg:p-8">
            <div className="mb-8 flex items-start justify-between gap-4">
               <div>
                  <p className="sans text-xs text-(--text-faint) uppercase tracking-widest mb-1 dark:text-gray-400">Gestión</p>
                  <h1 className="serif text-3xl font-semibold text-(--text) dark:text-(--surface)">Categorías</h1>
               </div>

               <button
                  onClick={handleOpenCreate}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-(--gold) text-(--gold-contrast) rounded-(--r-md) sans text-sm font-medium hover:bg-(--gold-deep) transition-colors"
               >
                  <FaPlus className="text-xs" />
                  Nueva categoría
               </button>
            </div>

            <div className="bg-(--surface) border border-(--line) rounded-(--r-lg) overflow-hidden animate-fade-in-up dark:bg-zinc-100 dark:border-gray-300">
               <div className="overflow-x-auto">
               <table className="w-full">
                  <thead>
                     <tr className="border-b border-(--line) dark:border-gray-300 dark:bg-gray-200">
                        {["#", "Nombre", "Descripción", "Categoría Padre", "Acciones"].map((h) => (
                           <th key={h} className="px-5 py-3 text-left sans text-xs font-medium text-(--text-faint) uppercase tracking-wider dark:text-(--surface)">
                              {h}
                           </th>
                        ))}
                     </tr>
                  </thead>
                  <tbody>
                     {categorias.map((i, index) => {
                        const parent = categorias.find((c) => c.id === i.parent_id);
                        return (
                           <tr key={i.id} className="border-b border-(--line) last:border-0 hover:bg-(--surface-2) transition-colors dark:border-gray-300 dark:hover:bg-gray-50">
                              <td className="px-5 py-3.5 sans text-sm text-(--text-muted) dark:text-gray-400">{index + 1}</td>
                              <td className="px-5 py-3.5 sans text-sm text-(--text) font-medium dark:text-(--surface)">
                                 {i.nombre}
                              </td>
                              <td className="px-5 py-3.5 sans text-sm text-(--text-muted) dark:text-gray-400">{i.descripcion}</td>
                              <td className="px-5 py-3.5 sans text-sm text-(--text-muted) dark:text-gray-400">
                                 {parent ? parent.nombre : <span className="text-(--gold)">Principal</span>}
                              </td>
                              <td className="px-5 py-3.5">
                                 <div className="flex items-center gap-2">
                                    <button
                                       onClick={() => handleOpenEdit(i)}
                                       className="sans text-xs px-3 py-1.5 rounded-(--r-sm) border border-(--line-strong) text-(--text-muted) hover:border-(--gold) hover:text-(--gold) transition-colors dark:border-gray-300 dark:text-gray-400 dark:hover:border-(--gold) dark:hover:text-(--gold)"
                                    >
                                       Editar
                                    </button>
                                    <button
                                       onClick={() => handleDelete(i.id)}
                                       className="sans text-xs px-3 py-1.5 rounded-(--r-sm) border border-red-500/20 text-red-400 hover:border-red-500/40 hover:text-red-300 transition-colors"
                                    >
                                       Eliminar
                                    </button>
                                 </div>
                              </td>
                           </tr>
                        );
                     })}
                  </tbody>
               </table>
               </div>
            </div>

            {isModalOpen && (
               <CategoriaModal
                  categoriaActivo={categoriaActivo}
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

export default CategoriaPage;
