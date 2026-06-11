import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';
import { getTopProductos } from '../services/StatisticsService';
import type { TopProducto } from '../types/Statistics';

const TopProductosChart = () => {
   const [data, setData] = useState<TopProducto[]>([]);

   useEffect(() => {
      getTopProductos().then(setData);
   }, []);

   const options: ApexOptions = {
      chart: { type: 'bar', toolbar: { show: false } },
      plotOptions: { bar: { horizontal: true, borderRadius: 4 } },
      xaxis: { categories: data.map((d) => d.producto) },
      dataLabels: { enabled: false },
      tooltip: { y: { formatter: (val) => `${val} vendidos` } },
   };

   const series = [{ name: 'Cantidad', data: data.map((d) => d.cantidad) }];

   return (
      <div className="bg-(--bg) shadow border rounded-2xl border-(--line) p-6">
         <h3 className="text-sm text-gray-500 mb-4">Top Productos</h3>
         {data.length > 0 ? (
            <Chart key={data.length} options={options} series={series} type="bar" width="100%" height={300} />
         ) : (
            <p className="text-sm text-gray-400 text-center py-10">Cargando...</p>
         )}
      </div>
   );
};

export default TopProductosChart;
