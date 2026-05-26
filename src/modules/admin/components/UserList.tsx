import { useAuthStore } from "../../../stores/useAuthStore";
import type { IUsuario } from "../types/IAdmin";
import UserCard from "./UserCard";

type Props = {
  users: IUsuario[];
};

export default function UserList({ users }: Props) {
  const authUser = useAuthStore((state) => state.user);

  const filtered = users.filter((user) => user.id !== authUser?.id);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 animate-fade-in-up">
      {filtered.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}
