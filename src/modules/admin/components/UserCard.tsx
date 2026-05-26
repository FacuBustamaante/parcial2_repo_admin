import { useActivarUsuario, useDesactivarUsuario } from "../hooks/useStatus";
import type { IUsuario } from "../types/IAdmin";
import UserRoleSelect from "./UserRoleSelect";

type Props = {
  user: IUsuario;
};

export default function UserCard({ user }: Props) {
  const { mutate: desactivar } = useDesactivarUsuario();
  const { mutate: activar } = useActivarUsuario();

  return (
    <div className="bg-(--surface) border border-(--line) rounded-(--r-lg) p-5 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-(--gold-soft) flex items-center justify-center serif text-base font-semibold text-(--gold) shrink-0">
          {user.nombre?.[0]?.toUpperCase() ?? "U"}
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="sans text-sm font-semibold text-(--text) truncate">{user.nombre}</h2>
          <p className="sans text-xs text-(--text-muted) truncate">{user.email}</p>
        </div>
        <span
          className={`sans text-xs px-2 py-0.5 rounded-full border shrink-0 ${
            user.activo
              ? "bg-green-500/10 border-green-500/20 text-green-400"
              : "bg-red-500/10 border-red-500/20 text-red-400"
          }`}
        >
          {user.activo ? "Activo" : "Inactivo"}
        </span>
      </div>

      {/* Roles */}
      <div className="border-t border-(--line) pt-4">
        <p className="sans text-xs font-medium text-(--text-faint) uppercase tracking-wider mb-3">Roles</p>
        <UserRoleSelect user={user} />
      </div>

      {/* Actions */}
      <div className="border-t border-(--line) pt-3">
        {user.activo ? (
          <button
            onClick={() => desactivar(user.id)}
            className="w-full sans text-sm py-2 rounded-(--r-md) border border-red-500/20 text-red-400 hover:border-red-500/40 hover:text-red-300 transition-colors"
          >
            Desactivar
          </button>
        ) : (
          <button
            onClick={() => activar(user.id)}
            className="w-full sans text-sm py-2 rounded-(--r-md) border border-green-500/20 text-green-400 hover:border-green-500/40 hover:text-green-300 transition-colors"
          >
            Activar
          </button>
        )}
      </div>
    </div>
  );
}
