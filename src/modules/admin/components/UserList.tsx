import { useAuthStore } from "../../../stores/useAuthStore";
import type { IUsuario } from "../types/IAdmin";
import UserCard from "./UserCard";

type Props = {
  users: IUsuario[];
};

export default function UserList({ users }: Props) {
  const authUser = useAuthStore((state) => state.user);

  return (
    <div>
      {users
        .filter((user) => user.id !== authUser?.id)
        .map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
    </div>
  );
}