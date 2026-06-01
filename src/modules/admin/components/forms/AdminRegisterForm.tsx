import { useAuthStore } from "../../../../stores/useAuthStore";
import { useState } from "react";
import type { RegisterPayloadWithRole } from "../../../auth/types/api";
import { ROLES_STATUSES, type UserRole } from "../../types/roles.constant";

type Props = {
  onSuccess?: () => void;
};

function AdminRegisterForm({ onSuccess }: Props) {
  const createUser = useAuthStore((s) => s.createUser);
  const error = useAuthStore((s) => s.error);
  const setError = useAuthStore((s) => s.setError);

  const [roles, setRoles] = useState<UserRole[]>([]);

  const [formData, setFormData] = useState<RegisterPayloadWithRole>({
    nombre: "",
    apellido: "",
    email: "",
    celular: "",
    password: "",
    roles: [],
  });

  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const toggleRole = (role: UserRole) => {
    setRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role],
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (
  e: React.FormEvent<HTMLFormElement>
) => {
  e.preventDefault();

  setError(null);

  if (formData.password !== passwordConfirm) {
    setError("Las contraseñas no coinciden");
    return;
  }

  setIsLoading(true);

  try {
    const payload = {
      ...formData,
      roles,
    };

    console.log(payload);

    await createUser(payload);

    onSuccess?.();
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
  <div className="bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl p-8">
    <div className="flex justify-between items-start mb-6">
      <div>
        <h2 className="serif text-2xl font-semibold text-(--gold)">
          Crear Usuario
        </h2>

        <p className="sans text-sm text-(--text-muted) mt-1">
          Completá los datos del nuevo usuario
        </p>
      </div>

      <button
        type="button"
        onClick={onSuccess}
        className="text-(--text-muted) hover:text-(--text) text-xl leading-none"
      >
        ×
      </button>
    </div>

    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-(--r-md) sans text-sm text-red-400">
          {error}
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        {/* NOMBRE */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="nombre" className={labelClass}>
            Nombre
          </label>

          <input
            id="nombre"
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
            disabled={isLoading}
            placeholder="Nombre"
            className={inputClass}
          />
        </div>

        {/* APELLIDO */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="apellido" className={labelClass}>
            Apellido
          </label>

          <input
            id="apellido"
            type="text"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
            required
            disabled={isLoading}
            placeholder="Apellido"
            className={inputClass}
          />
        </div>

        {/* EMAIL */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className={labelClass}>
            Email
          </label>

          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={isLoading}
            placeholder="usuario@email.com"
            className={inputClass}
          />
        </div>

        {/* CELULAR */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="celular" className={labelClass}>
            Celular
          </label>

          <input
            id="celular"
            type="text"
            name="celular"
            value={formData.celular}
            onChange={handleChange}
            disabled={isLoading}
            placeholder="Celular"
            className={inputClass}
          />
        </div>

        {/* PASSWORD */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="password" className={labelClass}>
            Contraseña
          </label>

          <input
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            disabled={isLoading}
            placeholder="Contraseña"
            className={inputClass}
          />
        </div>

        {/* CONFIRM PASSWORD */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="passwordConfirm" className={labelClass}>
            Confirmar Contraseña
          </label>

          <input
            id="passwordConfirm"
            type="password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            required
            disabled={isLoading}
            placeholder="Repetí la contraseña"
            className={inputClass}
          />
        </div>
      </div>

      {/* ROLES */}
      <div className="flex flex-col gap-3">
        <label className={labelClass}>Roles</label>

        <div className="flex flex-wrap gap-3">
          {ROLES_STATUSES.map((role) => (
            <label
              key={role}
              className={`
                flex items-center gap-2 px-3 py-2 rounded-(--r-md)
                border cursor-pointer transition-all
                ${
                  roles.includes(role)
                    ? "border-(--gold) bg-yellow-500/10"
                    : "border-zinc-700 bg-zinc-800"
                }
              `}
            >
              <input
                type="checkbox"
                checked={roles.includes(role)}
                onChange={() => toggleRole(role)}
                className="accent-(--gold)"
              />

              <span className="sans text-sm text-(--text)">
                {role}
              </span>
            </label>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-(--gold) text-(--gold-contrast) font-semibold sans rounded-(--r-md) py-2.5 text-sm hover:bg-(--gold-deep) transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? "Registrando..." : "Crear Usuario"}
      </button>
    </form>
  </div>
);
}

export default AdminRegisterForm;
