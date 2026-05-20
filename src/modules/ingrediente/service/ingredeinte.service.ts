import apiClient from "../../../api/axiosInstance";

import type {
  IIngrediente,
  IIngredientesResponse,
} from "../types/IIngrediente";

const BASE = "/ingredientes";

// ── GET ALL ────────────────────────────────────────────────────────

export async function listIngredientes(): Promise<IIngrediente[]> {
  const response =
    await apiClient.get<IIngredientesResponse>(`${BASE}/`);

  return response.data.data;
}

// ── GET ONE ────────────────────────────────────────────────────────

export async function getIngrediente(
  id: number,
): Promise<IIngrediente> {
  const response = await apiClient.get<IIngrediente>(
    `${BASE}/${id}`,
  );

  return response.data;
}

// ── CREATE ─────────────────────────────────────────────────────────

export async function createIngrediente(
  body: Omit<IIngrediente, "id">,
): Promise<IIngrediente> {
  const response = await apiClient.post<IIngrediente>(
    `${BASE}/`,
    body,
  );

  return response.data;
}

// ── UPDATE ─────────────────────────────────────────────────────────

export async function updateIngrediente(
  id: number,
  body: Omit<IIngrediente, "id">,
): Promise<IIngrediente> {
  const response = await apiClient.patch<IIngrediente>(
    `${BASE}/${id}`,
    body,
  );

  return response.data;
}

// ── DELETE ─────────────────────────────────────────────────────────

export async function deleteIngrediente(
  id: number,
): Promise<void> {
  await apiClient.delete(`${BASE}/${id}`);
}