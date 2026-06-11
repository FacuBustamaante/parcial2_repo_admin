import apiClient from "../../../api/axiosInstance";
import type {
   FacturacionTotalResponse,
   Periodo,
   CantidadPedidosResponse,
   FacturacionPorDia,
   FacturacionPorPeriodoResponse,
   PedidosPorDia,
   PedidosPorPeriodoResponse,
   TopProducto,
   TopProductosResponse
} from "../types/Statistics";

const BASE = "/estadisticas"

export async function getFacturacionTotal(): Promise<FacturacionTotalResponse> {
   const response = await apiClient.get<FacturacionTotalResponse>(`${BASE}/facturacion-total`);
   return response.data;
}

export async function getCantidadPedidos(): Promise<CantidadPedidosResponse> {
   const response = await apiClient.get<CantidadPedidosResponse>(`${BASE}/cantidad-pedidos`);
   return response.data;
}

export async function getFacturacionPorPeriodo(periodo: Periodo): Promise<FacturacionPorPeriodoResponse> {
   const response = await apiClient.get<FacturacionPorPeriodoResponse>(`${BASE}/facturacion`, { params: { periodo } });
   return response.data;
}

export async function getPedidosPorPeriodo(periodo: Periodo): Promise<PedidosPorPeriodoResponse> {
   const response = await apiClient.get<PedidosPorPeriodoResponse>(`${BASE}/pedidos`, { params: { periodo } });
   return response.data;
}

export async function getTopProductos(): Promise<TopProductosResponse> {
   const response = await apiClient.get<TopProductosResponse>(`${BASE}/top-productos`);
   return response.data;
}

