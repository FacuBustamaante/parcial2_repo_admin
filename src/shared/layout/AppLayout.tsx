import { Outlet } from "react-router-dom";
import { UserHeader } from "./UserHeader";

// ───────────────────────────────────────────────────────────────────────

// Este componente AppLayout define la estructura principal de la aplicación una vez que el usuario ya está autenticado. Funciona como un layout global en React: contiene un header fijo con información del usuario y una sección principal donde se renderiza el contenido de cada página.

// ───────────────────────────────────────────────────────────────────────


export function AppLayout() {
  return (
    <div className="min-h-screen">
      <header className="border-b border-zinc-200 bg-white px-4 py-4 sm:px-6">
        <div className="mx-auto w-full max-w-3xl">
          <UserHeader />
        </div>
      </header>
      <main className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6">
        <Outlet />
      </main>
    </div>
  );
}
