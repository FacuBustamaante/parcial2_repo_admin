import { useActivarUsuario, useDesactivarUsuario } from "../hooks/useStatus";
import type { IUsuario } from "../types/IAdmin";
import UserRoleSelect from "./UserRoleSelect";

type Props = {
  user: IUsuario;
};

export default function UserCard({ user }: Props) {
  const { mutate: desactivar } = useDesactivarUsuario();
  const { mutate: activar } = useActivarUsuario();

  console.log("ID A DESACTIVAR:", user.id)
  return (
    <div>
      <div>
        <h2>{user.nombre}</h2>

        <p>{user.email}</p>
      </div>

      <div>
        <div>
          <p>Rol</p>

          <UserRoleSelect user={user} />
        </div>

        <div>
          <p className="text-sm font-medium mb-1">Estado</p>

          <span>{user.activo ? "Activo" : "Desactivado"}</span>
        </div>
      </div>
      {user.activo && (
        <button onClick={() => desactivar(user.id)}>Desactivar</button>
      )}

      {!user.activo && (
        <button onClick={() => activar(user.id)}>Activar</button>
      )}
    </div>
  );
}
