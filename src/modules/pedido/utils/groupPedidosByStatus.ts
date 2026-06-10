import type { IPedido } from "../types/IPedido";
import type { PedidoStatus } from "../types/pedido.constant";

// Función para agrupar pedidos por su estado

export function groupPedidosByStatus(
  pedidos: IPedido[],
): Record<PedidoStatus, IPedido[]> {
  const initial: Record<PedidoStatus, IPedido[]> = {
    CANCELADO: [],
    PENDIENTE: [],
    CONFIRMADO: [],
    EN_PREP: [],
    ENTREGADO: [],
  };

  return pedidos.reduce((acc, pedido) => {
    const key = pedido.estado_codigo as PedidoStatus;
    if (acc[key]) acc[key].push(pedido);
    return acc;
  }, initial);
}
