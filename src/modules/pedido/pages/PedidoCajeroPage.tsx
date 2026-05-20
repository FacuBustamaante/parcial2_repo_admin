import { useEffect, useState } from "react";

import { listPedidos } from "../service/pedido.service";

import type { IPedido } from "../types/IPedido";

export function PedidoCajeroPage() {
  const [pedidos, setPedidos] = useState<IPedido[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPedidos() {
      try {
        const data = await listPedidos();

        setPedidos(data);
      } catch (err) {
        console.error(err);
        setError("Error al cargar los pedidos");
      } finally {
        setLoading(false);
      }
    }

    void loadPedidos();
  }, []);

  if (loading) {
    return <p>Cargando pedidos...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container py-4">
      <h1 className="mb-4">Pedidos</h1>

      {pedidos.length === 0 ? (
        <p>No hay pedidos</p>
      ) : (
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Usuario</th>
              <th>Estado</th>
              <th>Forma Pago</th>
              <th>Subtotal</th>
              <th>Descuento</th>
              <th>Envío</th>
              <th>Total</th>
            </tr>
          </thead>

          <tbody>
            {pedidos.map((pedido) => (
              <tr key={pedido.id}>
                <td>{pedido.id}</td>
                <td>{pedido.usuario_id}</td>
                <td>{pedido.estado_codigo}</td>
                <td>{pedido.forma_pago_codigo}</td>
                <td>${pedido.subtotal}</td>
                <td>${pedido.descuento}</td>
                <td>${pedido.costo_envio}</td>
                <td>${pedido.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );

  
}