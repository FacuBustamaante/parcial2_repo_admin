import { useLocation, Link } from "react-router-dom";
import { FaBox, FaTags, FaCarrot, FaUser, FaPlus, FaSignOutAlt, FaShoppingCart, FaChartBar } from "react-icons/fa";
import { useAuthStore } from "../../stores/useAuthStore";
import {  ThemeToggle } from "../../shared/components/ThemeToggle";

interface Props {
   onCreate?: () => void;
}

function Navbar({ onCreate }: Props) {
   const location = useLocation();
   const hasRole = useAuthStore((state) => state.hasRole);
   const user = useAuthStore((state) => state.user);
   const logout = useAuthStore((state) => state.logout);

   const path = location.pathname;

   const canAccessStock = hasRole("ADMIN", "STOCK");
   const canAccessPedidos = hasRole("ADMIN", "PEDIDOS");
   const canAccessAdmin = hasRole("ADMIN");

   const navLinks = [
      { to: "/statistics", label: "Estadísticas", icon: <FaChartBar />, show: canAccessAdmin },
      { to: "/cajero", label: "Pedidos", icon: <FaShoppingCart />, show: canAccessPedidos },
      { to: "/productos", label: "Productos", icon: <FaBox />, show: canAccessStock },
      { to: "/categorias", label: "Categorías", icon: <FaTags />, show: canAccessStock },
      { to: "/ingredientes", label: "Ingredientes", icon: <FaCarrot />, show: canAccessStock },
      { to: "/admin", label: "Admin", icon: <FaUser />, show: canAccessAdmin },
   ];

   const addLabels: Record<string, string> = {
      "/productos": "Añadir Producto",
      "/categorias": "Añadir Categoría",
      "/ingredientes": "Añadir Ingrediente",
   };

   const showAdd = onCreate && addLabels[path];

   return (
      <aside className="fixed top-0 left-0 h-screen w-64 dark:bg-zinc-100 bg-(--surface) border-r dark:border-gray-300  border-(--line) flex flex-col z-40">

         {/* Brand */}
         <div className="px-6 py-5 border-b dark:border-gray-300  border-(--line)">
            <p className="serif text-xl font-semibold dark:text-(--bg) text-(--text)">
               Foodstore <span className="text-(--gold)">Admin</span>
            </p>
            <p className="sans dark:text-(--surface-3) text-xs text-(--text-faint) uppercase tracking-widest mt-0.5">
               {user?.roles ?? "—"}
            </p>
         </div>

         {/* Nav links */}
         <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
            <ThemeToggle />
            {navLinks
               .filter((l) => l.show)
               .map(({ to, label, icon }) => {
                  const isActive = path === to;
                  return (
                     <Link
                        key={to}
                        to={to}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-(--r-md) sans text-sm transition-colors ${isActive
                              ? "bg-(--gold-soft) dark:text-(--bg) text-(--gold) dark:bg-(--gold) dark:hover:bg-(--gold-deep)"
                              : "dark:text-(--surface-3) text-(--text-muted) hover:text-(--text) dark:hover:bg-(--gold) dark:hover:text-(--surface) hover:bg-(--surface-2)"
                           }`}
                     >
                        <span className="text-base shrink-0">{icon}</span>
                        {label}
                     </Link>
                  );
               })}

            {showAdd && (
               <button
                  onClick={onCreate}
                  className="mt-3 w-full flex items-center gap-2 px-3 py-2.5 bg-(--gold) text-(--gold-contrast) rounded-(--r-md) sans text-sm font-medium hover:bg-(--gold-deep) transition-colors"
               >
                  <FaPlus className="text-xs shrink-0" />
                  {addLabels[path]}
               </button>
            )}
            
         </nav>

         {/* User section */}
         <div className="border-t border-(--line) dark:border-gray-300 px-4 py-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-(--gold-soft) dark:bg-(--amber) dark:text-(--text) flex items-center justify-center serif text-sm font-semibold text-(--gold) shrink-0">
               {user?.full_name?.[0]?.toUpperCase() ?? "U"}
            </div>
            <div className="flex-1 min-w-0">
               <p className="sans text-sm dark:text-(--surface-3) text-(--text) truncate leading-tight">{user?.full_name}</p>
               <p className="sans text-xs dark:text-(--surface-3) text-(--text-faint) truncate">{user?.email}</p>
            </div>
            <button
               onClick={logout}
               title="Cerrar sesión"
               className="text-(--text-faint) dark:text-(--surface-3)  hover:text-(--gold) transition-colors p-1 shrink-0"
            >
               <FaSignOutAlt />
            </button>
         </div>
      </aside>
   );
}

export default Navbar;
