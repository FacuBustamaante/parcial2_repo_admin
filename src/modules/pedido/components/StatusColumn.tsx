import { STATUS_LABEL, type PedidoStatus } from "../types/pedido.constant";
import type { IPedido } from "../types/IPedido";
import PedidoCard from "./PedidoCard";

const columnAccent: Record<PedidoStatus, string> = {
  CANCELADO:  "text-red-400 bg-red-500/10 border-red-500/20",
  PENDIENTE:  "text-(--amber) bg-amber-500/10 border-amber-500/20",
  CONFIRMADO: "text-(--green) bg-green-500/10 border-green-500/20",
  EN_PREP:    "text-(--blue) bg-blue-500/10 border-blue-500/20",
  EN_CAMINO:  "text-(--blue) bg-blue-500/10 border-blue-500/20",
  ENTREGADO:  "text-(--green) bg-green-500/10 border-green-500/20",
};

type Props = {
  status: PedidoStatus;
  orders: IPedido[];
  onContinue: (order: IPedido) => void;
  onCancel: (order: IPedido) => void;
};

export default function StatusColumn({ status, orders, onContinue, onCancel }: Props) {
  return (
    <div className="flex-1 min-w-64 bg-(--surface) border border-(--line) rounded-(--r-lg) flex flex-col max-h-[calc(100vh-12rem)]">

      {/* Header */}
      <div className="px-4 py-3 border-b border-(--line) flex items-center justify-between shrink-0">
        <h3 className="sans text-sm font-medium text-(--text)">{STATUS_LABEL[status]}</h3>
        <span className={`sans text-xs px-2 py-0.5 rounded-full border ${columnAccent[status]}`}>
          {orders.length}
        </span>
      </div>

      {/* Cards */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {orders.length === 0 ? (
          <p className="sans text-xs text-(--text-faint) text-center py-6">Sin pedidos</p>
        ) : (
          orders.map((order) => (
            <PedidoCard
              key={order.id}
              order={order}
              onContinue={() => onContinue(order)}
              onCancel={() => onCancel(order)}
            />
          ))
        )}
      </div>
    </div>
  );
}
