import { useEffect, useState } from "react";
import type { IPedido } from "../types/IPedido";
import { PEDIDO_STATUSES, type PedidoStatus } from "../types/pedido.constant";
import StatusColumn from "./StatusColumn";
import { groupPedidosByStatus } from "../utils/groupPedidosByStatus";
import { getNextStatus } from "../helpers/pedidoNextPrevStatus";
import { listPedidos, cambiarEstadoPedido } from "../service/pedido.service";
import { ClipLoader } from "react-spinners";

export default function OrdersBoard() {
  const [pedidos, setPedidos] = useState<IPedido[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listPedidos()
      .then(setPedidos)
      .finally(() => setLoading(false));
  }, []);

  const continuarPedido = async (pedido: IPedido) => {
    const nextStatus = getNextStatus(pedido.estado_codigo as PedidoStatus);
    if (!nextStatus || nextStatus === pedido.estado_codigo) return;

    setPedidos((prev) =>
      prev.map((p) => (p.id === pedido.id ? { ...p, estado_codigo: nextStatus } : p))
    );
    try {
      await cambiarEstadoPedido(pedido.id, nextStatus);
    } catch (err) {
      console.error(err);
      const fresh = await listPedidos();
      setPedidos(fresh);
    }
  };

  const cancelarPedido = async (pedido: IPedido) => {
    if (pedido.estado_codigo === "ENTREGADO" || pedido.estado_codigo === "CANCELADO") return;

    setPedidos((prev) =>
      prev.map((p) => (p.id === pedido.id ? { ...p, estado_codigo: "CANCELADO" } : p))
    );
    try {
      await cambiarEstadoPedido(pedido.id, "CANCELADO");
    } catch (err) {
      console.error(err);
      const fresh = await listPedidos();
      setPedidos(fresh);
    }
  };

  if (loading)
    return (
      <div className="flex flex-1 items-center justify-center">
        <ClipLoader color="var(--gold)" size={36} />
      </div>
    );

  const grouped = groupPedidosByStatus(pedidos);

  return (
    <div className="flex gap-3 overflow-x-auto pb-4 animate-fade-in-up flex-1">
      {PEDIDO_STATUSES.map((status) => (
        <StatusColumn
          key={status}
          status={status}
          orders={grouped[status] || []}
          onContinue={continuarPedido}
          onCancel={cancelarPedido}
        />
      ))}
    </div>
  );
}
