import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createIngrediente,
  deleteIngrediente,
  listIngredientes,
  updateIngrediente,
} from "../service/ingredeinte.service";
import type { IIngrediente, CreateIngrediente } from "../types/IIngrediente";
import IngredienteModal from "../components/modals/IngredienteModal";
import Navbar from "../../../shared/layout/NavBar";
import styles from "./IngredientePage.module.css";
import Swal from "sweetalert2";
import { ClipLoader } from "react-spinners";

function IngredientePage() {
  const queryClient = useQueryClient();

  // ── Manejo del Modal ────────────────────────────
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ingredienteActivo, setIngredienteActivo] =
    useState<IIngrediente | null>(null);

  // ── GET ─────────────────────────────────────────
  const {
    data: ingredientes = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["ingredientes"],
    queryFn: listIngredientes,
    staleTime: 1000 * 60 * 5,
  });

  // ── CREATE MUTATION  ──────────────────────────────────────
  const createMutation = useMutation({
    mutationFn: createIngrediente,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ingredientes"] });
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

  // ── UPDATE MUTATION ──────────────────────────────────────
  const updateMutation = useMutation({
    mutationFn: ({
      id,
      ingrediente,
    }: {
      id: number;
      ingrediente: CreateIngrediente;
    }) => updateIngrediente(id, ingrediente),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ingredientes"] });
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "Ocurrió un error",
      });
    },
  });

  // ── DELETE ──────────────────────────────────────
  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteIngrediente(id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ingredientes"] });

      Swal.fire({
        title: "Eliminado",
        text: "El ingrediente ha sido eliminado",
        icon: "success",
      });
    },
  });

  // ── HANDLERS ────────────────────────────────────

  const handleOpenCreate = () => {
    setIngredienteActivo(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (ingrediente: IIngrediente) => {
    setIngredienteActivo(ingrediente);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIngredienteActivo(null);
  };

  const handleCreate = (data: CreateIngrediente) => {
    createMutation.mutate(data);
  };

  const handleUpdate = (id: number, data: CreateIngrediente) => {
    updateMutation.mutate({ id, ingrediente: data });
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

  // ── UI ──────────────────────────────────────────

  if (isLoading)
    return (
      <div className={styles.loaderContainer}>
        <ClipLoader />
      </div>
    );
  if (isError) return <p>Hubo un error</p>;

  return (
    <div>
      <Navbar onCreate={handleOpenCreate} />

      <div className={styles.container}>
        <h1 className={styles.title}>Ingredientes</h1>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Alérgeno</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {ingredientes.map((i, index) => (
                <tr key={i.id}>
                  <td>{index + 1}</td>
                  <td>{i.nombre}</td>
                  <td>{i.descripcion}</td>

                  <td>{i.es_alergeno ? "Sí" : "No"}</td>

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
              ))}
            </tbody>
          </table>
        </div>

        {isModalOpen && (
          <IngredienteModal
            ingredienteActivo={ingredienteActivo}
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

export default IngredientePage;
