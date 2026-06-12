import { useUsers } from "../hooks/useUser";
import { ClipLoader } from "react-spinners";
import UserList from "../components/UserList";
import Navbar from "../../../shared/layout/NavBar";
import { useState } from "react";
import AdminModal from "../components/modals/AdminModal";

function AdminPage() {
   const { data, isLoading } = useUsers(1);
   const [isModalOpen, setIsModalOpen] = useState(false);

   if (isLoading)
      return (
         <div className="flex min-h-screen items-center justify-center bg-(--bg)">
            <ClipLoader color="var(--gold)" size={36} />
         </div>
      );

   return (
      <div className="flex min-h-screen bg-(--bg) dark:bg-zinc-100">
         <Navbar />

         <main className="flex-1 ml-64 p-8">
            <div className="flex items-center justify-between mb-8">
               <div>
                  <p className="sans text-xs text-(--text-faint) uppercase tracking-widest mb-1 dark:text-gray-400">
                     Gestión
                  </p>

                  <h1 className="serif text-3xl font-semibold text-(--text) dark:text-(--surface)">
                     Usuarios
                  </h1>
               </div>

               <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-(--gold) text-(--gold-contrast) px-4 py-2 rounded-(--r-md) font-medium"
               >
                  Nuevo usuario
               </button>
            </div>

            <UserList users={data ?? []} />
         </main>

         {isModalOpen && (
            <AdminModal onClose={() => setIsModalOpen(false)} />
         )}
      </div>
   );
}

export default AdminPage;