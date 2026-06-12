import Navbar from "../../../shared/layout/NavBar"
import KDSNavbar from "../../../shared/layout/KDSNavbar"
import { useAuthStore } from "../../../stores/useAuthStore"
import PedidoBoard from "../../pedido/components/PedidoBoard"

const CajeroPage = () => {
   const hasRole = useAuthStore((s) => s.hasRole)

   return (
      <div className="flex min-h-screen bg-(--bg)">
         {hasRole("ADMIN") ? <Navbar /> : <KDSNavbar />}

         <main className="flex-1 ml-0 lg:ml-64 px-4 pt-16 pb-6 lg:p-8 flex flex-col min-h-screen">
            <div className="mb-6">
               <p className="sans text-xs text-(--text-faint) uppercase tracking-widest mb-1">Panel</p>
               <h1 className="serif text-3xl font-semibold text-(--text)">Cajero</h1>
            </div>

            <PedidoBoard />
         </main>
      </div>
   )
}

export default CajeroPage