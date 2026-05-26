import { useState } from "react";
import type { IUsuario } from "../types/IAdmin";
import { ROLES_STATUSES, type UserRole } from "../types/roles.constant";
import { useUpdateUserRole } from "../hooks/useUpadteRole";

type Props = {
  user: IUsuario;
};

export default function UserRoleSelect({ user }: Props) {
  const [roles, setRoles] = useState<UserRole[]>(user.roles);
  const updateRolesMutation = useUpdateUserRole();

  const toggleRole = (role: UserRole) => {
    setRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
    );
  };

  const handleSaveRoles = () => {
    updateRolesMutation.mutate({ id: user.id, roles });
  };

  return (
    <div className="space-y-3">
      <div className="space-y-2">
        {ROLES_STATUSES.map((role) => (
          <label key={role} className="flex items-center gap-2.5 cursor-pointer group">
            <input
              type="checkbox"
              checked={roles.includes(role)}
              onChange={() => toggleRole(role)}
              className="accent-(--gold) w-3.5 h-3.5"
            />
            <span className="sans text-sm text-(--text-muted) group-hover:text-(--text) transition-colors">
              {role}
            </span>
          </label>
        ))}
      </div>

      <button
        onClick={handleSaveRoles}
        disabled={updateRolesMutation.isPending}
        className="w-full bg-(--gold) text-(--gold-contrast) sans text-sm font-medium py-2 rounded-(--r-md) hover:bg-(--gold-deep) transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {updateRolesMutation.isPending ? "Guardando..." : "Guardar cambios"}
      </button>
    </div>
  );
}
