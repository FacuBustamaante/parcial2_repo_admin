import type { ReactNode } from "react";
import { useAuthStore } from "../../stores/useAuthStore";
import { Navigate } from "react-router-dom";

export function AuthLayout({ children }: { children: ReactNode }) {
  const user = useAuthStore((s) => s.user);
  const isLoading = useAuthStore((s) => s.isLoading);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-(--bg)">
        <p className="sans text-sm text-(--text-muted)">Cargando…</p>
      </div>
    );
  }

  if (user) return <Navigate to="/cajero" replace />;

  return <>{children}</>;
}
