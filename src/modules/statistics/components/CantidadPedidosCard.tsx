import { useEffect, useState } from 'react';
import { getCantidadPedidos } from '../services/StatisticsService';

const CantidadPedidosCard = () => {
   const [cantidad, setCantidad] = useState<number | null>(null);

   useEffect(() => {
      getCantidadPedidos().then(setCantidad);
   }, []);

   return (
      <div className="w-full flex flex-col items-center bg-(--surface) justify-center shadow border rounded-2xl border-(--line) py-16 px-4">
         <span className="text-6xl font-bold text-(--text) sans">
            {cantidad !== null ? cantidad.toLocaleString() : '...'}
         </span>
         <span className="mt-2 text-sm text-gray-500">Cantidad de Pedidos</span>
      </div>
   );
};

export default CantidadPedidosCard;
