// features/orders/components/OrdersBoard.tsx

import { useEffect, useState } from "react";

import type { IPedido } from "../types/IPedido";
import {
  PEDIDO_STATUSES,
  type PedidoStatus,
} from "../types/pedido.constant";

import StatusColumn from "./StatusColumn";

import { groupPedidosByStatus } from "../utils/groupPedidosByStatus";
import { getNextStatus } from "../helpers/pedidoNextPrevStatus";

import {
  listPedidos,
  cambiarEstadoPedido,
} from "../service/pedido.service";

export default function OrdersBoard() {
  const [pedidos, setPedidos] = useState<IPedido[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listPedidos()
      .then(setPedidos)
      .finally(() => setLoading(false));
  }, []);

  // ── CONTINUAR FLUJO ─────────────────────────────────────

  const continuarPedido = async (pedido: IPedido) => {
    const nextStatus = getNextStatus(
      pedido.estado_codigo as PedidoStatus
    );

    // evita avanzar entregados o cancelados
    if (!nextStatus || nextStatus === pedido.estado_codigo) {
      return;
    }
    // optimistic update
    setPedidos((prev) =>
      prev.map((p) =>
        p.id === pedido.id
          ? { ...p, estado_codigo: nextStatus }
          : p
      )
    );
    // backend update
    try {
      await cambiarEstadoPedido(pedido.id, nextStatus);
    } catch (err) {
      console.error(err);

      // rollback simple
      const fresh = await listPedidos();
      setPedidos(fresh);
    }
  };

  // ── CANCELAR PEDIDO ─────────────────────────────────────

  const cancelarPedido = async (pedido: IPedido) => {
    // evita cancelar entregados o cancelados
    if (
      pedido.estado_codigo === "ENTREGADO" ||
      pedido.estado_codigo === "CANCELADO"
    ) {
      return;
    }

    // optimistic update
    setPedidos((prev) =>
      prev.map((p) =>
        p.id === pedido.id
          ? { ...p, estado_codigo: "CANCELADO" }
          : p
      )
    );

    try {
      await cambiarEstadoPedido(
        pedido.id,
        "CANCELADO"
      );
    } catch (err) {
      console.error(err);
      
      const fresh = await listPedidos();
      setPedidos(fresh);
    }
  };

  if (loading) {
    return <p>Cargando pedidos...</p>;
  }


  const grouped = groupPedidosByStatus(pedidos);

  return (
    <div
      style={{
        display: "flex",
        gap: 12,
        alignItems: "flex-start",
        overflowX: "auto",
      }}
    >
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