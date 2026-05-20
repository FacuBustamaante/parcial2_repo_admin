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

  return (
    <div>
      <h1>Registrarse</h1>

      <form onSubmit={handleSubmit}>
        {error && <div>{error}</div>}

        {/* NOMBRE */}
        <div>
          <label htmlFor="nombre">Nombre</label>

          <input
            id="nombre"
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
            disabled={isLoading}
            placeholder="Tu nombre"
          />
        </div>

        {/* APELLIDO */}
        <div>
          <label htmlFor="apellido">Apellido</label>

          <input
            id="apellido"
            type="text"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
            required
            disabled={isLoading}
            placeholder="Tu apellido"
          />
        </div>

        {/* EMAIL */}
        <div>
          <label htmlFor="email">Email</label>

          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={isLoading}
            placeholder="tu@email.com"
          />
        </div>

        {/* CELULAR */}
        <div>
          <label htmlFor="celular">Celular</label>

          <input
            id="celular"
            type="text"
            name="celular"
            value={formData.celular}
            onChange={handleChange}
            disabled={isLoading}
            placeholder="Tu celular"
          />
        </div>

        {/* PASSWORD */}
        <div>
          <label htmlFor="password">Contraseña</label>

          <input
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            disabled={isLoading}
            placeholder="Tu contraseña"
          />
        </div>

        {/* CONFIRM PASSWORD */}
        <div>
          <label htmlFor="passwordConfirm">Confirmar Contraseña</label>

          <input
            id="passwordConfirm"
            type="password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            required
            disabled={isLoading}
            placeholder="Confirmar contraseña"
          />
        </div>

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Registrando..." : "Registrarse"}
        </button>
      </form>

      <p>
        ¿Ya tienes cuenta?{" "}
        <button type="button" onClick={() => navigate("/login")}>
          Iniciar Sesión
        </button>
      </p>
    </div>
  );
}
