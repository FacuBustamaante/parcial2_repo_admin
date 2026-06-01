export const ROLES_STATUSES = [ "COCINA","STOCK", "PEDIDOS", "CLIENT"] as const;

export type RoleStatus = (typeof ROLES_STATUSES)[number];

export const STATUS_LABEL: Record<RoleStatus, string> = {
  COCINA: "Cocina",
  STOCK: "Stock",
  PEDIDOS: "Pedidos",
  CLIENT: "Cliente",
};

export type UserRole =
  (typeof ROLES_STATUSES)[number];