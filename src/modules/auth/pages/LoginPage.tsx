import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../stores/useAuthStore";
import { useState } from "react";

// ───────────────────────────────────────────────────────────────────────
// Página de Login - Módulo Auth
// ───────────────────────────────────────────────────────────────────────

export function LoginPage() {

   const navigate = useNavigate();
   const login = useAuthStore((s) => s.login);
   const error = useAuthStore((s) => s.error);
   const setError = useAuthStore((s) => s.setError);

   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const [isLoading, setIsLoading] = useState(false);

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      setIsLoading(true);
      setError(null);

      try {
         await login(username, password);

         // obtenemos el usuario actualizado desde zustand
         const user = useAuthStore.getState().user;

         if (!user) {
            navigate("/forbidden");
            return;
         }

         if (user.roles.includes("ADMIN")) {
            navigate("/admin");
            return;
         }

         if (user.roles.includes("PEDIDOS")) {
            navigate("/cajero");
            return;
         }

         if (user.roles.includes("STOCK")) {
            navigate("/productos");
            return;
         }

         navigate("/forbidden");

      } catch {
         // El error ya está en el store
      } finally {
         setIsLoading(false);
      }
   };

   return (
      <div className="min-h-screen bg-(--bg) flex flex-col items-center justify-center px-4">
         <div className="text-center mb-8">
            <h1 className="serif text-5xl  text-(--text) mb-4">FoodStore <span className="text-(--gold)">Admin</span></h1>
            <p className="sans text-sm uppercase sans tracking-[0.32em] text-[9px] text-(--text-muted) mt-1">Panel administrativo</p>
         </div>
         <div className="w-full max-w-md bg-(--surface) border border-(--line) rounded-(--r-lg) p-8 animate-fade-in-up">
            <div className="mb-5 flex flex-col gap-4">
               <h2 className="serif text-3xl  text-(--text)">Bienvenido</h2>
               <p className="sans text-sm text-(--text-muted)">Ingresa para gestionar pedidos, productos y stock.</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5">
               {error && (
                  <div className="px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-(--r-md) sans text-sm text-red-400">
                     {error}
                  </div>
               )}

               <div className="flex flex-col gap-1.5">
                  <label className="sans text-sm text-(--text-muted)">
                     Email
                  </label>
                  <input
                     type="text"
                     value={username}
                     onChange={(e) => setUsername(e.target.value)}
                     required
                     disabled={isLoading}
                     placeholder="Tu email"
                     className="w-full bg-(--bg) border border-(--line) rounded-(--r-md) px-4 py-2.5 sans text-sm text-(--text) placeholder:text-(--text-faint) focus:outline-none focus:border-(--gold) focus:ring-1 focus:ring-(--gold) transition-colors disabled:opacity-50"
                  />
               </div>

               <div className="flex flex-col gap-1.5">
                  <label className="sans text-sm text-(--text-muted)">
                     Contraseña
                  </label>
                  <input
                     type="password"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     required
                     disabled={isLoading}
                     placeholder="Tu contraseña"
                     className="w-full bg-(--bg) border border-(--line) rounded-(--r-md) px-4 py-2.5 sans text-sm text-(--text) placeholder:text-(--text-faint) focus:outline-none focus:border-(--gold) focus:ring-1 focus:ring-(--gold) transition-colors disabled:opacity-50"
                  />
               </div>

               <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-(--gold) text-(--gold-contrast) font-semibold sans rounded-(--r-md) py-2.5 text-sm hover:bg-(--gold-deep) transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
               >
                  {isLoading ? "Iniciando sesión…" : "Iniciar Sesión"}
               </button>
            </form>

            <p className="mt-6 text-center sans text-sm text-(--text-muted)">
               ¿No tenés cuenta?{" "}
               <button
                  onClick={() => navigate("/register")}
                  className="text-(--gold) hover:text-(--amber) transition-colors font-medium"
               >
                  Registrarse
               </button>
            </p>
         </div>
      </div>
   );
}