import Navbar from "../../../shared/layout/NavBar";
import PedidoBoard from "../components/PedidoBoard";

function PedidoCajeroPage() {
  return (
    <div className="flex min-h-screen bg-(--bg)">
      <Navbar />

      <main className="flex-1 ml-64 p-8 flex flex-col min-h-screen">
        <div className="mb-6">
          <p className="sans text-xs text-(--text-faint) uppercase tracking-widest mb-1">Panel</p>
          <h1 className="serif text-3xl font-semibold text-(--text)">Pedidos</h1>
        </div>

        <PedidoBoard />
      </main>
    </div>
  );
}

export default PedidoCajeroPage;
