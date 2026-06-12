import Navbar from "../../../shared/layout/NavBar";
import PedidoBoard from "../components/PedidoBoard";

function PedidoCajeroPage() {
   return (
      <div className="flex min-h-screen bg-(--bg) dark:bg-zinc-100">
         <Navbar />

         <main className="flex-1 ml-0 lg:ml-64 px-4 pt-16 pb-6 lg:p-8 flex flex-col min-h-screen">
            <div className="mb-6">
               <p className="sans text-xs text-(--text-faint) uppercase tracking-widest mb-1 dark:text-gray-400">Panel</p>
               <h1 className="serif text-3xl font-semibold text-(--text) dark:text-(--surface)">Pedidos</h1>
            </div>

            <PedidoBoard />
         </main>
      </div>
   );
}

export default PedidoCajeroPage;
