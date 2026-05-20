export const PEDIDO_STATUSES = [
  "CANCELADO",
  "PENDIENTE",
  "CONFIRMADO",
  "EN_PREP",
  "EN_CAMINO",
  "ENTREGADO"
] as const;

export type PedidoStatus = typeof PEDIDO_STATUSES[number];

export const STATUS_LABEL: Record<PedidoStatus, string> = {
  CANCELADO: "Cancelado",
  PENDIENTE: "Pendiente",
  CONFIRMADO: "Confirmado",
  EN_PREP: "En preparación",
  EN_CAMINO: "En camino",
  ENTREGADO: "Entregado",
};