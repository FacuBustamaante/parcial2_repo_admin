import apiClient from "../../../api/axiosInstance";
import type { PedidoStatus } from "../types/pedido.constant";

import type {
  IPedido,
  PedidoCreatePayload,
} from "../types/IPedido";

const BASE = "/pedidos";

//TODO Definir si los endponts de cliente viven aca o en el otro front

// ── CLIENT: MIS PEDIDOS ────────────────────────────────────────────

export async function listMisPedidos(): Promise<IPedido[]> {
  const response = await apiClient.get<IPedido[]>(
    `${BASE}/mis-pedidos`,
  );

  return response.data;
}

// ── CLIENT: PEDIDO POR ID ──────────────────────────────────────────

export async function getPedido(
  id: number,
): Promise<IPedido> {
  const response = await apiClient.get<IPedido>(
    `${BASE}/${id}`,
  );

  return response.data;
}

// ── CLIENT: CREAR PEDIDO ───────────────────────────────────────────

export async function createPedido(
  body: PedidoCreatePayload,
): Promise<IPedido> {
  const response = await apiClient.post<IPedido>(
    `${BASE}/`,
    body,
  );

  return response.data;
}

// ── ADMIN / PEDIDOS: LISTAR TODOS ─────────────────────────────────

export async function listPedidos(): Promise<IPedido[]> {
  const response = await apiClient.get<IPedido[]>(
    `${BASE}/`,
  );

  return response.data;
}

// ── PEDIDOS / ADMIN: CAMBIAR ESTADO ────────────────────────────────

export async function cambiarEstadoPedido(
  pedidoId: number,
  nuevoEstado: PedidoStatus,
): Promise<IPedido> {
  const response = await apiClient.patch<IPedido>(
    `${BASE}/${pedidoId}/estado`,
    null,
    {
      params: {
        nuevo_estado: nuevoEstado,
      },
    },
  );

  return response.data;
}

// ── CLIENT: CANCELAR PEDIDO ────────────────────────────────────────

export async function cancelarPedido(
  pedidoId: number,
): Promise<IPedido> {
  const response = await apiClient.patch<IPedido>(
    `${BASE}/${pedidoId}/cancelar`,
  );

  return response.data;
}