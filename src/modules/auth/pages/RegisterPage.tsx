import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../stores/useAuthStore";
import { useState } from "react";
import type { RegisterPayload } from "../types/api";

/**
 * Página de Registro - Módulo Auth
 */
export function RegisterPage() {
   const navigate = useNavigate();

   const register = useAuthStore((s) => s.register);
   const error = useAuthStore((s) => s.error);
   const setError = useAuthStore((s) => s.setError);

   const [formData, setFormData] = useState<RegisterPayload>({
      nombre: "",
      apellido: "",
      email: "",
      celular: "",
      password: "",
   });

   const [passwordConfirm, setPasswordConfirm] = useState("");

   const [isLoading, setIsLoading] = useState(false);

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;

      setFormData((prev) => ({
         ...prev,
         [name]: value,
      }));
   };

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      setError(null);

      if (formData.password !== passwordConfirm) {
         setError("Las contraseñas no coinciden");
         return;
      }

      setIsLoading(true);

      try {
         await register(formData);
         navigate("/dashboard");
      } catch {
         // El error ya está manejado en el store
      } finally {
         setIsLoading(false);
      }
   };

   const inputClass =
      "w-full bg-(--surface-2) border border-(--line-strong) rounded-(--r-md) px-4 py-2.5 sans text-sm text-(--text) placeholder:text-(--text-faint) focus:outline-none focus:border-(--gold) focus:ring-1 focus:ring-(--gold) transition-colors disabled:opacity-50";

   const labelClass = "sans text-sm font-medium text-(--text-muted)";

   return (
      <div className="min-h-screen bg-(--bg) flex items-center justify-center px-4 py-10">
         <div className="w-full max-w-lg bg-(--surface) border border-(--line-strong) rounded-(--r-lg) p-8 animate-fade-in-up">

            <div className="text-center mb-8">
               <h1 className="serif text-3xl font-semibold text-(--gold)">Crear cuenta</h1>
               <p className="sans text-sm text-(--text-muted) mt-1">Completá tus datos para registrarte</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
               {error && (
                  <div className="px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-(--r-md) sans text-sm text-red-400">
                     {error}
                  </div>
               )}

               {/* NOMBRE / APELLIDO */}
               <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                     <label htmlFor="nombre" className={labelClass}>Nombre</label>
                     <input
                        id="nombre"
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                        disabled={isLoading}
                        placeholder="Tu nombre"
                        className={inputClass}
                     />
                  </div>

                  <div className="flex flex-col gap-1.5">
                     <label htmlFor="apellido" className={labelClass}>Apellido</label>
                     <input
                        id="apellido"
                        type="text"
                        name="apellido"
                        value={formData.apellido}
                        onChange={handleChange}
                        required
                        disabled={isLoading}
                        placeholder="Tu apellido"
                        className={inputClass}
                     />
                  </div>
               </div>

               {/* EMAIL */}
               <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className={labelClass}>Email</label>
                  <input
                     id="email"
                     type="email"
                     name="email"
                     value={formData.email}
                     onChange={handleChange}
                     required
                     disabled={isLoading}
                     placeholder="tu@email.com"
                     className={inputClass}
                  />
               </div>

               {/* CELULAR */}
               <div className="flex flex-col gap-1.5">
                  <label htmlFor="celular" className={labelClass}>Celular</label>
                  <input
                     id="celular"
                     type="text"
                     name="celular"
                     value={formData.celular}
                     onChange={handleChange}
                     disabled={isLoading}
                     placeholder="Tu celular"
                     className={inputClass}
                  />
               </div>

               {/* PASSWORD */}
               <div className="flex flex-col gap-1.5">
                  <label htmlFor="password" className={labelClass}>Contraseña</label>
                  <input
                     id="password"
                     type="password"
                     name="password"
                     value={formData.password}
                     onChange={handleChange}
                     required
                     disabled={isLoading}
                     placeholder="Tu contraseña"
                     className={inputClass}
                  />
               </div>

               {/* CONFIRM PASSWORD */}
               <div className="flex flex-col gap-1.5">
                  <label htmlFor="passwordConfirm" className={labelClass}>Confirmar Contraseña</label>
                  <input
                     id="passwordConfirm"
                     type="password"
                     value={passwordConfirm}
                     onChange={(e) => setPasswordConfirm(e.target.value)}
                     required
                     disabled={isLoading}
                     placeholder="Repetí tu contraseña"
                     className={inputClass}
                  />
               </div>

               <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-(--gold) text-(--gold-contrast) font-semibold sans rounded-(--r-md) py-2.5 text-sm hover:bg-(--gold-deep) transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
               >
                  {isLoading ? "Registrando..." : "Registrarse"}
               </button>
            </form>

            <p className="mt-6 text-center sans text-sm text-(--text-muted)">
               ¿Ya tenés cuenta?{" "}
               <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="text-(--gold) hover:text-(--amber) transition-colors font-medium"
               >
                  Iniciar Sesión
               </button>
            </p>
         </div>
      </div>
   );
}
