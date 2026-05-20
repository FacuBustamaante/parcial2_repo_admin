import type { IPedido } from "../types/IPedido";
import type { PedidoStatus } from "../types/pedido.constant";

// Función para agrupar pedidos por su estado

export function groupPedidosByStatus(
  pedidos: IPedido[],
): Record<PedidoStatus, IPedido[]> {
  const initial: Record<PedidoStatus, IPedido[]> = {
    PENDIENTE: [],
    CONFIRMADO: [],
    EN_PREP: [],
    EN_CAMINO: [],
    ENTREGADO: [],
    CANCELADO: [],
  };

  return pedidos.reduce((acc, pedido) => {
    acc[pedido.estado_codigo].push(pedido);
    return acc;
  }, initial);
}
