import { useCallback, useEffect, useState } from "react";
import type { IPedido } from "../types/IPedido";
import { CAJERO_STATUSES, PEDIDO_STATUSES, COCINA_STATUSES, type PedidoStatus } from "../types/pedido.constant";
import StatusColumn from "./StatusColumn";
import { groupPedidosByStatus } from "../utils/groupPedidosByStatus";
import { getNextStatus } from "../helpers/pedidoNextPrevStatus";
import { listPedidos, cambiarEstadoPedido } from "../service/pedido.service";
import { ClipLoader } from "react-spinners";
import { useAuthStore } from "../../../stores/useAuthStore";
import { useWebSocket, type WsMessage } from "../hooks/useWebSocket";

const ORDER_EVENTS = new Set([
   "NUEVO_PEDIDO",
   "PEDIDO_CONFIRMADO",
   "PEDIDO_EN_PREPARACION",
   "PEDIDO_CANCELADO",
   "PEDIDO_ENTREGADO",
]);

export default function OrdersBoard() {
   const [pedidos, setPedidos] = useState<IPedido[]>([]);
   const [loading, setLoading] = useState(true);
   const hasRole = useAuthStore((s) => s.hasRole);
   const visibleStatuses = hasRole("COCINA") ? COCINA_STATUSES : hasRole("CAJERO") ? CAJERO_STATUSES : PEDIDO_STATUSES;

   useEffect(() => {
      listPedidos()
         .then(setPedidos)
         .finally(() => setLoading(false));
   }, []);

   const handleWsMessage = useCallback((msg: WsMessage) => {
      if (msg.event === "WS_CONNECTED") {
         listPedidos().then(setPedidos);
         return;
      }
      console.log("[WS] evento recibido:", msg.event, msg.data);
      if (!ORDER_EVENTS.has(msg.event)) return;

      const updated = msg.data as IPedido;
      if (updated?.id && updated?.estado_codigo) {
         setPedidos((prev) => {
            const exists = prev.some((p) => p.id === updated.id);
            return exists
               ? prev.map((p) => (p.id === updated.id ? updated : p))
               : [...prev, updated];
         });
      } else {
         // El backend no mandó el pedido completo; refetch como fallback
         listPedidos().then(setPedidos);
      }
   }, []);

   useWebSocket({ onMessage: handleWsMessage });

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
         {visibleStatuses.map((status) => (
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
