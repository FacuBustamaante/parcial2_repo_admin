import { useEffect, type ReactNode } from "react";
import { useAuthStore } from "../stores/useAuthStore";

// ───────────────────────────────────────────────────────────────────────
// Este código define un componente InitApp en React cuya responsabilidad es inicializar la autenticación cuando la aplicación arranca. Recibe children, que representa todo el contenido interno de la app, y simplemente lo renderiza al final con return <>{children}</>. Actúa como un componente wrapper.
// ───────────────────────────────────────────────────────────────────────
export function InitApp({ children }: { children: ReactNode }) {
  const checkAuth = useAuthStore((s) => s.checkAuth);
  
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return <>{children}</>;
}
