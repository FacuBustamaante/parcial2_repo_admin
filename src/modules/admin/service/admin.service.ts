import apiClient from "../../../api/axiosInstance";
import type { IUsuario } from "../types/IAdmin";
import type { UserRole } from "../types/roles.constant";

const BASE = "/usuarios";

// ── GET ALL ────────────────────────────────────────────────────────
export async function listUsuarios(page: number): Promise<IUsuario[]> {
  const response = await apiClient.get<IUsuario[]>(`${BASE}/`,
   { params: {page}}
  );
  return response.data;
}

// ── UPDATE USER ROLE ────────────────────────────────────────────────────────
export const updateUserRoles = async (
  id: number,
  roles: UserRole[]
) => {
  const response = await apiClient.put(
    `/usuarios/${id}/roles`,
    {
      roles,
    }
  );

  return response.data;
};

// ── DESACTIVAR USUARIO ────────────────────────────────────────────────────────
export const desactivarUsuario = async (
  id: number,
) => {
  const response = await apiClient.post(
    `/usuarios/${id}/desactivar`
  );

  return response.data;
};
// ── ACTIVAR USUARIO ────────────────────────────────────────────────────────
export const activarUsuario = async (
  id: number,
) => {
  const response = await apiClient.post(
    `/usuarios/${id}/activar`
  );

  return response.data;
};
   