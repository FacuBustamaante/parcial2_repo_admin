import apiClient from "../../../api/axiosInstance";

import type {
  IProducto,
  IProductoResponse,
  CreateProducto,
} from "../types/IProducto";

const BASE = "/productos";

// ── GET ALL ────────────────────────────────────────────────────────

export async function listProductos(): Promise<IProducto[]> {
  const response =
    await apiClient.get<IProductoResponse>(`${BASE}/`);

  return response.data.data;
}

// ── GET ONE ────────────────────────────────────────────────────────

export async function getProducto(
  id: number,
): Promise<IProducto> {
  const response = await apiClient.get<IProducto>(
    `${BASE}/${id}`,
  );

  return response.data;
}

// ── CREATE ─────────────────────────────────────────────────────────

export async function createProducto(
  body: CreateProducto,
): Promise<IProducto> {
  const response = await apiClient.post<IProducto>(
    `${BASE}/`,
    body,
  );

  return response.data;
}

// ── UPDATE ─────────────────────────────────────────────────────────

export async function updateProducto(
  id: number,
  body: CreateProducto,
): Promise<IProducto> {
  const response = await apiClient.patch<IProducto>(
    `${BASE}/${id}`,
    body,
  );

  return response.data;
}

// ── DELETE ─────────────────────────────────────────────────────────

export async function deleteProducto(
  id: number,
): Promise<void> {
  await apiClient.delete(`${BASE}/${id}`);
}