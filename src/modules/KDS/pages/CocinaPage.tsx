import Navbar from "../../../shared/layout/NavBar"
import KDSNavbar from "../../../shared/layout/KDSNavbar"
import { useAuthStore } from "../../../stores/useAuthStore"
import PedidoBoard from "../../pedido/components/PedidoBoard"

const CocinaPage = () => {
   const hasRole = useAuthStore((s) => s.hasRole)

   return (
      <div className="flex min-h-screen bg-(--bg) dark:bg-zinc-100">
         {hasRole("ADMIN") ? <Navbar /> : <KDSNavbar />}

         <main className="flex-1 ml-64 p-8 flex flex-col min-h-screen">
            <div className="mb-6">
               <p className="sans text-xs text-(--text-faint) uppercase tracking-widest mb-1 dark:text-(--surface)">Panel</p>
               <h1 className="serif text-3xl font-semibold text-(--text) dark:text-(--surface)">Cocina</h1>
            </div>

            <PedidoBoard />
         </main>
      </div>
   )
}

export default CocinaPage