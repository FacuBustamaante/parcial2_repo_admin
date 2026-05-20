import type { PedidoStatus } from "./pedido.constant";

export interface PedidoDetalleInput {
  producto_id: number;
  cantidad: number;
  personalizacion?: number[];
}

export interface PedidoCreatePayload {
  direccion_id?: number;
  forma_pago_codigo: string;
  notas?: string;

  detalles: PedidoDetalleInput[];
}

export interface IPedido {
  id: number;

  usuario_id: number;
  direccion_id?: number;

  estado_codigo: PedidoStatus; 

  forma_pago_codigo: string;

  subtotal: number;
  descuento: number;
  costo_envio: number;
  total: number;

  notas?: string;
}


