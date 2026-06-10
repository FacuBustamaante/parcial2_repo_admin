export const PEDIDO_STATUSES = [
   "CANCELADO",
   "PENDIENTE",
   "CONFIRMADO",
   "EN_PREP",
   "ENTREGADO"
] as const;

export const COCINA_STATUSES = [
   "CONFIRMADO",
   "EN_PREP",
   "ENTREGADO",
] as const;

export const CAJERO_STATUSES = [
   "CANCELADO",
   "PENDIENTE",
   "CONFIRMADO",
   "ENTREGADO"
] as const;

export type PedidoStatus = typeof PEDIDO_STATUSES[number];

export const STATUS_LABEL: Record<PedidoStatus, string> = {
   CANCELADO: "Cancelado",
   PENDIENTE: "Pendiente",
   CONFIRMADO: "Confirmado",
   EN_PREP: "En preparación",
   ENTREGADO: "Entregado",
};

