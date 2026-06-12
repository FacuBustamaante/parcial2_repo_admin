import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';
import { getFacturacionPorPeriodo } from '../services/StatisticsService';
import type { Periodo } from '../types/Statistics';

type Props = {
   periodo: Periodo;
};

const FacturacionPorPeriodoChart = ({ periodo }: Props) => {
   const [fechas, setFechas] = useState<string[]>([]);
   const [totales, setTotales] = useState<number[]>([]);

   useEffect(() => {
      getFacturacionPorPeriodo(periodo).then((data) => {
         setFechas(data.map((d) => d.fecha));
         setTotales(data.map((d) => d.total));
      });
   }, [periodo]);

   const options: ApexOptions = {
      chart: { type: 'area', toolbar: { show: false } },
      colors: ['#C9A84C'],
      fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.5, opacityTo: 0.05 } },
      xaxis: { categories: fechas },
      yaxis: { labels: { formatter: (val) => `$${val.toLocaleString()}` } },
      dataLabels: { enabled: false },
      stroke: { curve: 'smooth', colors: ['#C9A84C'] },
      tooltip: { y: { formatter: (val) => `$${val.toLocaleString()}` } },
   };

   const series = [{ name: 'Facturación', data: totales }];

   return (
      <div className="w-full bg-(--bg) shadow border rounded-2xl border-(--line) p-6 dark:bg-zinc-100 dark:border-zinc-300">
         <h3 className="text-sm text-gray-500 mb-4 dark:text-(--surface) font-bold">Facturación por {periodo}</h3>
         <Chart options={options} series={series} type="area" width="100%" height={280} />
      </div>
   );
};

export default FacturacionPorPeriodoChart;
