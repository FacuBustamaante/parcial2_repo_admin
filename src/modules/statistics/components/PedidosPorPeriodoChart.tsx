import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import type { ApexOptions } from 'apexcharts';
import { getPedidosPorPeriodo } from '../services/StatisticsService';
import type { Periodo } from '../types/Statistics';

type Props = {
   periodo: Periodo;
};

const PedidosPorPeriodoChart = ({ periodo }: Props) => {
   const [fechas, setFechas] = useState<string[]>([]);
   const [cantidades, setCantidades] = useState<number[]>([]);

   useEffect(() => {
      getPedidosPorPeriodo(periodo).then((data) => {
         setFechas(data.map((d) => d.fecha));
         setCantidades(data.map((d) => d.cantidad));
      });
   }, [periodo]);

   const options: ApexOptions = {
      chart: { type: 'bar', toolbar: { show: false } },
      colors: ['#C9A84C'],
      xaxis: { categories: fechas },
      dataLabels: { enabled: false },
      plotOptions: { bar: { borderRadius: 4 } },
      tooltip: { y: { formatter: (val) => `${val} pedidos` } },
   };

   const series = [{ name: 'Pedidos', data: cantidades }];

   return (
      <div className="w-full bg-(--bg) shadow border rounded-2xl border-(--line) p-6 dark:bg-zinc-100 dark:border-zinc-300">
         <h3 className="text-sm text-gray-500 mb-4 dark:text-(--surface) font-bold">Pedidos por {periodo}</h3>
         <Chart options={options} series={series} type="bar" width="100%" height={280} />
      </div>
   );
};

export default PedidosPorPeriodoChart;
