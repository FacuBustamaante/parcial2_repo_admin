import { useUsers } from "../hooks/useUser";
import { ClipLoader } from "react-spinners";
import UserList from "../components/UserList";
import Navbar from "../../../shared/layout/NavBar";

function AdminPage() {
   const { data, isLoading } = useUsers(1);

   if (isLoading)
      return (
         <div className="flex min-h-screen items-center justify-center bg-(--bg)">
            <ClipLoader color="var(--gold)" size={36} />
         </div>
      );

   return (
      <div className="flex min-h-screen bg-(--bg)">
         <Navbar />

         <main className="flex-1 ml-64 p-8">
            <div className="mb-8">
               <p className="sans text-xs text-(--text-faint) uppercase tracking-widest mb-1">Gestión</p>
               <h1 className="serif text-3xl font-semibold text-(--text)">Usuarios</h1>
            </div>

            <UserList users={data ?? []} />
         </main>
      </div>
   );
}

export default AdminPage;
