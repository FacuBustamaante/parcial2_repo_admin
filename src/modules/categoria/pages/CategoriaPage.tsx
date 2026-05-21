import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ICategoria, CreateCategoria } from "../types/ICategoria";
import {
  updateCategoria,
  createCategoria,
  deleteCategoria,
  listCategorias,
} from "../service/categoria.service";
import { useState } from "react";
import CategoriaModal from "../components/modals/CategoriaModal";
import Navbar from "../../../shared/layout/NavBar";

import styles from "./CategoriaPage.module.css";

import Swal from "sweetalert2";
import { ClipLoader } from "react-spinners";


function CategoriaPage() {
  const queryClient = useQueryClient();

  // ── Manejo del Modal ────────────────────────────
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoriaActivo, setCategoriaActivo] = useState<ICategoria | null>(
    null,
  );

  /*
  ────────────────────────────────────────────────────────────────────────────
  TanStack Query: el hook useQuery se utiliza para obtener datos de forma asíncrona. Mediante desestructuración, toma la propiedad data (renombrándola como categorias y dándole un valor por defecto []), junto con los estados isLoading y isError. 
  
  La consulta se identifica con la clave ["categorias"] y ejecuta la función getCategoria para traer los datos. Además, staleTime indica que esos datos se considerarán “frescos” durante 5 minutos, evitando refetch innecesarios en ese lapso. 
  ────────────────────────────────────────────────────────────────────────────
  */

  // ── GET ────────────────────────────────────────────
  const {
    data: categorias = [],
    isLoading,
    //isError,
  } = useQuery({
    queryKey: ["categorias"],
    queryFn: listCategorias,
    staleTime: 1000 * 60 * 5,
  });

  /*
  ────────────────────────────────────────────────────────────────────────────
  Para las mutaciones con useMutation, el patrón es el mismo para CREATE, UPDATE y DELETE: se define mutationFn con la función que ejecuta la acción (por ejemplo createCategoria, updateCategoria o deleteCategoria) y, en onSuccess, se invalida la query ["categorias"] usando queryClient. invalidateQueries para forzar la actualización de los datos en caché; además se ejecutan efectos secundarios como cerrar un modal o limpiar formularios.
  
  En esencia, cada mutación se encarga de enviar cambios al servidor y luego sincronizar el estado local refrescando la lista de categorías automáticamente.
  ────────────────────────────────────────────────────────────────────────────
  */

  // ── CREATE MUTATION  ─────────────────────────────────────────
  const createMutation = useMutation({
    mutationFn: createCategoria,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categorias"],
      });
      setIsModalOpen(false);
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "Ocurrió un error",
      });
    },
  });

  // ── UPDATE MUTATION ─────────────────────────────────────────
  const updateMutation = useMutation({
    mutationFn: ({
      id,
      categoria,
    }: {
      id: number;
      categoria: CreateCategoria;
    }) => updateCategoria(id, categoria),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categorias"] });
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "Ocurrió un error",
      });
    },
  });
  // ── DELETE MUTATION  ─────────────────────────────────────────

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteCategoria(id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categorias"] });

      Swal.fire({
        title: "Eliminado",
        text: "La categoría ha sido eliminada",
        icon: "success",
      });
    },
  });

  /*
  Estos handlers gestionan la interacción de la UI con el estado y las mutaciones: handleOpenCreate prepara el formulario para crear una nueva categoría (resetea categoriaActivo y abre el modal), mientras que handleOpenEdit carga la categoría seleccionada en el estado y también abre el modal para editarla. handleCloseModal cierra el modal y limpia la categoría activa. Por otro lado, handleCreate, handleUpdate y handleDelete actúan como puentes hacia las mutaciones (createMutation, updateMutation, deleteMutation), ejecutando mutate con los datos correspondientes para crear, actualizar o eliminar una categoría, lo que dispara luego la lógica definida en useMutation (como refrescar la lista). 
  */

  // ── HANDLERS ────────────────────────────────────

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

  const handleCreate = (data: CreateCategoria) => {
    createMutation.mutate(data);
  };

  const handleUpdate = (id: number, data: CreateCategoria) => {
    updateMutation.mutate({ id, categoria: data });
  };

  const handleDelete = (id: number) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esta acción",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  if (isLoading)
    return (
      <div className={styles.loaderContainer}>
        <ClipLoader />
      </div>
    );
  //if (isError) return <p>Hubo un error</p>;
  return (
    <div>
      <Navbar onCreate={handleOpenCreate} />

      <div className={styles.container}>
        <h1 className={styles.title}>Categorías</h1>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Categoría Padre</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {categorias.map((i, index) => {
                const parent = categorias.find((c) => c.id === i.parent_id);

                return (
                  <tr key={i.id}>
                    <td>{index + 1}</td>
                    <td>{i.nombre}</td>
                    <td>{i.descripcion}</td>
                    <td>{parent ? parent.nombre : "Principal"}</td>
                    <td className={styles.actions}>
                      <button
                        onClick={() => handleOpenEdit(i)}
                        className={styles.editButton}
                      >
                        Editar
                      </button>

                      <button
                        onClick={() => handleDelete(i.id)}
                        className={styles.deleteButton}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {isModalOpen && (
          <CategoriaModal
            categoriaActivo={categoriaActivo}
            onClose={handleCloseModal}
            onCreate={handleCreate}
            onUpdate={handleUpdate}
          />
        )}

        {createMutation.isPending && (
          <div className={styles.loaderContainer}>
            <ClipLoader />
          </div>
        )}
        {updateMutation.isPending && (
          <div className={styles.loaderContainer}>
            <ClipLoader />
          </div>
        )}
      </div>
    </div>
  );
}

export default CategoriaPage;
