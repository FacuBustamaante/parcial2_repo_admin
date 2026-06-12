import { useEffect, useState } from 'react';
import { getFacturacionTotal } from '../services/StatisticsService';

const SingleNumberChart = () => {
   const [facturacionTotal, setFacturacionTotal] = useState<number | null>(null);

   useEffect(() => {
      getFacturacionTotal().then(setFacturacionTotal);
   }, []);

   return (
      <div className="w-full flex flex-col items-center bg-(--bg) justify-center shadow border rounded-2xl border-(--line) py-16 px-4 dark:bg-zinc-200 dark:border-zinc-300">
         <span className="text-6xl font-bold text-(--text) sans dark:text-(--surface) dark:shadow-gray-400">
            {facturacionTotal !== null ? `$${facturacionTotal.toLocaleString()}` : '...'}
         </span>
         <span className="mt-2 text-sm text-gray-500">Facturación Total</span>
      </div>
   );
};

export default SingleNumberChart;
