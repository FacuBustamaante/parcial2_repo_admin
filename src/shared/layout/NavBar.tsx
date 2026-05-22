import { useLocation, Link } from "react-router-dom";
import styles from "./NavBar.module.css";
import { FaHome, FaBox, FaTags, FaCarrot, FaUser } from "react-icons/fa";

interface Props {
  onCreate?: () => void;
}

function Navbar({ onCreate }: Props) {
  const location = useLocation();

  const isHome = location.pathname === "/";
  const isProductos = location.pathname === "/productos";
  const isIngredientes = location.pathname === "/ingredientes";
  const isCategorias = location.pathname === "/categorias";
  const isCajero = location.pathname === "/cajero";
  const isAdmin = location.pathname === "/admin";

  const getButtonLabel = () => {
    if (isProductos) return "+ Añadir Producto";
    if (isCategorias) return "+ Añadir Categoría";
    if (isIngredientes) return "+ Añadir Ingrediente";
    return null;
  };

  //const label = getButtonLabel();

  return (
    <div className={styles.navbar}>
      <div className={styles.container}>
        {/* LINKS */}
        <div className={styles.links}>
          <Link to="/" className={styles.link}>
            <FaHome className={styles.icon} />
            Home
          </Link>

          {!isProductos && (
            <Link to="/productos" className={styles.link}>
              <FaBox className={styles.icon} />
              Productos
            </Link>
          )}

          {!isCategorias && (
            <Link to="/categorias" className={styles.link}>
              <FaTags className={styles.icon} />
              Categorías
            </Link>
          )}

          {!isIngredientes && (
            <Link to="/ingredientes" className={styles.link}>
              <FaCarrot className={styles.icon} />
              Ingredientes
            </Link>
          )}
          {!isCajero && (
            <Link to="/cajero" className={styles.link}>
              <FaUser className={styles.icon} />
              Cajero
            </Link>
          )}
          {!isAdmin && (
            <Link to="/admin" className={styles.link}>
              <FaUser className={styles.icon} />
              Admin
            </Link>
          )}
        </div>

        
        {!isHome && !isCajero && (
          <button onClick={onCreate} className={styles.button}>
            {getButtonLabel()}
          </button>
        )}

      </div>
    </div>
  );
}

export default Navbar;
