export type Periodo = "semana" | "mes";
export type FacturacionTotalResponse = number;
export type CantidadPedidosResponse = number;

// ─── Gráficos ─────────────────────────────────────────────────────────────────

// GET /api/v1/estadisticas/facturacion?periodo=semana|mes
export interface FacturacionPorDia {
   fecha: string; // "YYYY-MM-DD"
   total: number;
}
export type FacturacionPorPeriodoResponse = FacturacionPorDia[];

// GET /api/v1/estadisticas/pedidos?periodo=semana|mes
export interface PedidosPorDia {
   fecha: string; // "YYYY-MM-DD"
   cantidad: number;
}
export type PedidosPorPeriodoResponse = PedidosPorDia[];

// GET /api/v1/estadisticas/top-productos
export interface TopProducto {
   producto: string;
   cantidad: number;
}
export type TopProductosResponse = TopProducto[];
