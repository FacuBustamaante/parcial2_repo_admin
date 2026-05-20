// features/orders/components/StatusColumn.tsx

import {
  STATUS_LABEL,
  type PedidoStatus,
} from "../types/pedido.constant";

import type { IPedido } from "../types/IPedido";

import PedidoCard from "./PedidoCard";

type Props = {
  status: PedidoStatus;
  orders: IPedido[];

  onContinue: (order: IPedido) => void;
  onCancel: (order: IPedido) => void;
};

export default function StatusColumn({
  status,
  orders,
  onContinue,
  onCancel,
}: Props) {
  return (
    <div
      style={{
        flex: 1,
        minWidth: 280,
        padding: 12,
        border: "1px solid #ddd",
        borderRadius: 8,
        background: "#f8f8f8",
      }}
    >
      {/* ── HEADER ───────────────────────────── */}

      <h3
        style={{
          textAlign: "center",
          marginBottom: 16,
        }}
      >
        {STATUS_LABEL[status]} ({orders.length})
      </h3>

      {/* ── LISTA DE PEDIDOS ─────────────────── */}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        {orders.map((order) => (
          <PedidoCard
            key={order.id}
            order={order}
            onContinue={() => onContinue(order)}
            onCancel={() => onCancel(order)}
          />
        ))}
      </div>
    </div>
  );
}