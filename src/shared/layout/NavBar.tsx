import { useLocation, Link } from "react-router-dom";
import styles from "./NavBar.module.css";
import { FaHome, FaBox, FaTags, FaCarrot, FaUser } from "react-icons/fa";
import { useAuthStore } from "../../stores/useAuthStore";

interface Props {
  onCreate?: () => void;
}

function Navbar({ onCreate }: Props) {
  const location = useLocation();

  const hasRole = useAuthStore((state) => state.hasRole);

  const isHome = location.pathname === "/";
  const isProductos = location.pathname === "/productos";
  const isIngredientes = location.pathname === "/ingredientes";
  const isCategorias = location.pathname === "/categorias";
  const isCajero = location.pathname === "/cajero";
  const isAdmin = location.pathname === "/admin";

  const canAccessStock = hasRole("ADMIN", "STOCK");
  const canAccessPedidos = hasRole("ADMIN", "PEDIDOS");
  const canAccessAdmin = hasRole("ADMIN");

  const getButtonLabel = () => {
    if (isProductos) return "+ Añadir Producto";
    if (isCategorias) return "+ Añadir Categoría";
    if (isIngredientes) return "+ Añadir Ingrediente";

    return null;
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.links}>

          {canAccessStock && !isProductos && (
            <Link to="/productos" className={styles.link}>
              <FaBox className={styles.icon} />
              Productos
            </Link>
          )}

          {canAccessStock && !isCategorias && (
            <Link to="/categorias" className={styles.link}>
              <FaTags className={styles.icon} />
              Categorías
            </Link>
          )}

          {canAccessStock && !isIngredientes && (
            <Link to="/ingredientes" className={styles.link}>
              <FaCarrot className={styles.icon} />
              Ingredientes
            </Link>
          )}

          {canAccessPedidos && !isCajero && (
            <Link to="/cajero" className={styles.link}>
              <FaUser className={styles.icon} />
              Cajero
            </Link>
          )}

          {canAccessAdmin && !isAdmin && (
            <Link to="/admin" className={styles.link}>
              <FaUser className={styles.icon} />
              Admin
            </Link>
          )}
        </div>

        {!isHome && !isCajero && canAccessStock && (
          <button onClick={onCreate} className={styles.button}>
            {getButtonLabel()}
          </button>
        )}
      </div>
    </div>
  );
}

export default Navbar;
