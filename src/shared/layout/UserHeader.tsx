import { useAuthStore } from "../../stores/useAuthStore";

// ───────────────────────────────────────────────────────────────────────
// Este componente UserHeader muestra información del usuario autenticado y un botón para cerrar sesión. Obtiene user y logout desde el store global de Zustand usando useAuthStore. Gracias a eso, cualquier cambio en la autenticación actualiza automáticamente el header sin necesidad de pasar props manualmente.

// La línea if (!user) return null; evita renderizar el componente si no hay un usuario autenticado. Es decir, si la sesión no existe, el componente no muestra nada. Esto es muy común en React para ocultar partes de la interfaz dependiendo del estado de la aplicación.

//Cuando sí existe un usuario, el componente muestra datos básicos como nombre, username, email y rol (user.role). Además, el botón “Cerrar sesión” ejecuta logout, que probablemente limpia el store local y llama al backend para invalidar la cookie HTTPOnly de autenticación. Así el usuario sale de la sesión y deja de acceder al contenido protegido.
// ───────────────────────────────────────────────────────────────────────

export function UserHeader() {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  if (!user) return null;

  return (
    <header className="flex flex-col items-center justify-between gap-3 sm:flex-row sm:text-left">
      <div>
        <p className="text-sm text-zinc-500">Sesión iniciada</p>
        <p className="text-lg font-semibold text-zinc-900">
          {user.full_name}{" "}
          <span className="text-sm font-normal text-zinc-500">
            (@{user.username})
          </span>
        </p>
        <p className="text-sm text-zinc-500">
          {user.email} · rol{" "}
          <span className="font-medium text-violet-600">{user.role}</span>
        </p>
      </div>
      <button
        type="button"
        onClick={logout}
        className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-800 hover:bg-zinc-50"
      >
        Cerrar sesión
      </button>
    </header>
  );
}
