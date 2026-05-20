import type { ReactNode } from "react";
import { useAuthStore } from "../../stores/useAuthStore";
import { Navigate } from "react-router-dom";
// ───────────────────────────────────────────────────────────────────────
// layout de autenticación en React. Su objetivo es envolver páginas como login o registro y controlar el acceso según el estado de autenticación del usuario. Recibe children, que representa las páginas hijas, y las renderiza solamente si el usuario NO está autenticado.

// El componente obtiene user e isLoading desde el store de Zustand. Mientras isLoading es true, muestra una pantalla de carga porque la app todavía está verificando la sesión con el backend (checkAuth). Esto evita que aparezca momentáneamente el login antes de saber si el usuario ya tiene una sesión válida.

// Luego, si existe user, significa que el usuario ya está autenticado, entonces el layout redirige automáticamente al dashboard usando navigate() o <Navigate /> de React Router. Si no hay usuario autenticado, recién ahí renderiza el contenido (children), por ejemplo el formulario de login o registro.
// ───────────────────────────────────────────────────────────────────────


export function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = useAuthStore((s) => s.user);
  const isLoading = useAuthStore((s) => s.isLoading);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-zinc-500">Cargando…</p>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/cajero" replace />;
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
        {children}
      </div>
    </div>
  );
}

