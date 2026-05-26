import type { IPedido } from "../types/IPedido";
import type { PedidoStatus } from "../types/pedido.constant";

type Props = {
  order: IPedido;
  onContinue: () => void;
  onCancel: () => void;
};

const statusBadge: Record<PedidoStatus, string> = {
  CANCELADO:  "text-red-400 bg-red-500/10 border-red-500/20",
  PENDIENTE:  "text-amber-400 bg-amber-500/10 border-amber-500/20",
  CONFIRMADO: "text-green-400 bg-green-500/10 border-green-500/20",
  EN_PREP:    "text-blue-400 bg-blue-500/10 border-blue-500/20",
  EN_CAMINO:  "text-blue-400 bg-blue-500/10 border-blue-500/20",
  ENTREGADO:  "text-green-400 bg-green-500/10 border-green-500/20",
};

export default function OrderCard({ order, onContinue, onCancel }: Props) {
  const isFinal = order.estado_codigo === "ENTREGADO";
  const isCanceled = order.estado_codigo === "CANCELADO";
  const badgeCls = statusBadge[order.estado_codigo as PedidoStatus] ?? "";

  return (
    <div className="bg-(--surface-2) border border-(--line) rounded-(--r-md) p-3 space-y-2.5">
      <div className="flex items-start justify-between gap-2">
        <p className="sans text-xs text-(--text-faint)">Pedido #{order.id}</p>
        <span className={`sans text-xs px-2 py-0.5 rounded-full border shrink-0 ${badgeCls}`}>
          {order.estado_codigo}
        </span>
      </div>

      {!isFinal && !isCanceled && (
        <div className="flex gap-2 pt-1">
          <button
            onClick={onContinue}
            className="flex-1 sans text-xs py-1.5 rounded-(--r-sm) bg-(--gold-soft) text-(--gold) hover:bg-(--gold) hover:text-(--gold-contrast) transition-colors font-medium"
          >
            Continuar →
          </button>
          <button
            onClick={onCancel}
            className="sans text-xs px-3 py-1.5 rounded-(--r-sm) border border-red-500/20 text-red-400 hover:border-red-500/40 hover:text-red-300 transition-colors"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
