import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";
import type { UserRole } from "../modules/auth/types/api";

// ───────────────────────────────────────────────────────────────────────
// Este componente ProtectedRoute protege rutas privadas dentro de la aplicación usando React Router y el estado global de autenticación almacenado en Zustand. Recibe una prop allowedRoles, que indica qué roles pueden acceder a esa ruta, por ejemplo ["admin"] o ["admin", "stock"].
// ───────────────────────────────────────────────────────────────────────

type Props = {
   allowedRoles: UserRole[];
};

export const ProtectedRoute = ({ allowedRoles }: Props) => {
   const { user, hasRole, isLoading } = useAuthStore();

   if (isLoading) {
      return (
         <div className="flex min-h-screen items-center justify-center">
            <p className="text-sm text-zinc-500">Restaurando sesión…</p>
         </div>
      );
   }

   if (!user) {
      return <Navigate to="/login" replace />;
   }

   if (!hasRole(...allowedRoles)) {
      return <Navigate to="/forbidden" replace />;
   }

   return <Outlet />;
};
