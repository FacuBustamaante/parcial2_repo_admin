export const ROLES_STATUSES = ["ADMIN", "STOCK", "PEDIDOS", "CLIENT"] as const;

export type RoleStatus = (typeof ROLES_STATUSES)[number];

export const STATUS_LABEL: Record<RoleStatus, string> = {
  ADMIN: "Administrador",
  STOCK: "Stock",
  PEDIDOS: "Pedidos",
  CLIENT: "Cliente",
};

export type UserRole =
  (typeof ROLES_STATUSES)[number];