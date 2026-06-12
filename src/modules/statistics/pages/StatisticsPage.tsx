import Navbar from "../../../shared/layout/NavBar"
import SingleNumberChart from '../components/radialBar';
import CantidadPedidosCard from '../components/CantidadPedidosCard';
import FacturacionPorPeriodoChart from '../components/FacturacionPorPeriodoChart';
import PedidosPorPeriodoChart from '../components/PedidosPorPeriodoChart';
import TopProductosChart from '../components/TopProductosChart';

const Statistics = () => {

   return (
      <>
         <div className="flex min-h-screen bg-(--bg) dark:bg-zinc-100">
            <Navbar />
            <main className="ml-64 p-8 flex-1 flex flex-col gap-6">
               <div className="mb-8">
                  <p className="sans text-xs text-(--text-faint) uppercase tracking-widest mb-1 dark:text-gray-400">Gestión</p>
                  <h1 className="serif text-3xl font-semibold text-(--text) dark:text-(--surface)">Estadísticas</h1>
               </div>

               <div className="flex gap-6">
                  <SingleNumberChart />
                  <CantidadPedidosCard />
               </div>
               <FacturacionPorPeriodoChart periodo="mes" />
               <PedidosPorPeriodoChart periodo="mes" />
               <div className="col-span-2">
                  <TopProductosChart />
               </div>
            </main>
         </div>
      </>
   )
}

export default Statistics