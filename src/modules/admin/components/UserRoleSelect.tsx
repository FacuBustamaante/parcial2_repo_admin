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
    if (roles.includes(role)) {
      setRoles(roles.filter((r) => r !== role));
    } else {
      setRoles([...roles, role]);
    }
  };

  const handleSaveRoles = () => {
    updateRolesMutation.mutate({
      id: user.id,
      roles
    });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {ROLES_STATUSES.map((role) => (
          <label key={role} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={roles.includes(role)}
              onChange={() => toggleRole(role)}
            />

            {role}
          </label>
        ))}
      </div>

      <button
        onClick={handleSaveRoles}
        disabled={updateRolesMutation.isPending}
        className="
          bg-black
          text-white
          px-4
          py-2
          rounded-xl
          disabled:opacity-50
        "
      >
        {updateRolesMutation.isPending ? "Guardando..." : "Guardar cambios"}
      </button>
    </div>
  );
}
