import Navbar from "../../../shared/layout/NavBar";
import PedidoBoard from "../components/PedidoBoard";

function PedidoCajeroPage() {
  
  return (
    <div style={{ padding: 20 }}>
      <Navbar />
      <h1>Panel Cajero</h1>
      <PedidoBoard  />
    </div>
  );
}

export default PedidoCajeroPage;
