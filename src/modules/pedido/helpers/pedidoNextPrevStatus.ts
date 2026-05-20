// features/orders/model/order.helpers.ts

import { PEDIDO_STATUSES } from "../types/pedido.constant";
import type { PedidoStatus } from "../types/pedido.constant";


// Función para obtener el siguiente estado de un pedido

export function getNextStatus(status: PedidoStatus): PedidoStatus {
  const index = PEDIDO_STATUSES.indexOf(status);
  if (index === -1 || index === PEDIDO_STATUSES.length - 1) return status;
  return PEDIDO_STATUSES[index + 1];
}

