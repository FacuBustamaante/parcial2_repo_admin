import apiClient from "../../../api/axiosInstance";

import type { ICategoria, ICategoriaResponse } from "../types/ICategoria";

const BASE = "/categorias";

// ── GET ALL ────────────────────────────────────────────────────────

export async function listCategorias(): Promise<ICategoria[]> {
  const response = await apiClient.get<ICategoriaResponse>(`${BASE}/`);

  return response.data.data;
}

// ── GET ONE ────────────────────────────────────────────────────────

export async function getCategoria(id: number): Promise<ICategoria> {
  const response = await apiClient.get<ICategoria>(`${BASE}/${id}`);

  return response.data;
}

// ── CREATE ─────────────────────────────────────────────────────────

export async function createCategoria(
  body: Omit<ICategoria, "id">,
): Promise<ICategoria> {
  const response = await apiClient.post<ICategoria>(`${BASE}/`, body);

  return response.data;
}

// ── UPDATE ─────────────────────────────────────────────────────────

export async function updateCategoria(
  id: number,
  body: Omit<ICategoria, "id">,
): Promise<ICategoria> {
  const response = await apiClient.patch<ICategoria>(`${BASE}/${id}`, body);

  return response.data;
}

// ── DELETE ─────────────────────────────────────────────────────────

export async function deleteCategoria(id: number): Promise<void> {
  await apiClient.delete(`${BASE}/${id}`);
}
