// features/orders/components/OrderCard.tsx

import type { IPedido } from "../types/IPedido";

type Props = {
  order: IPedido;
  onContinue: () => void;
  onCancel: () => void;
};

export default function OrderCard({ order, onContinue, onCancel }: Props) {
  const isFinal = order.estado_codigo === "ENTREGADO";
  const isCanceled = order.estado_codigo === "CANCELADO";

  return (
    <div style={{ border: "1px solid #ccc", padding: 10 }}>
      <div>Pedido #{order.id}</div>
      <div>Estado: {order.estado_codigo}</div>

      <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
        {!isFinal && !isCanceled && (
          <>
            <button onClick={onContinue}>
              Continuar →
            </button>

            <button
              onClick={onCancel}
              style={{ background: "red", color: "white" }}
            >
              Cancelar ✕
            </button>
          </>
        )}
      </div>
    </div>
  );
}