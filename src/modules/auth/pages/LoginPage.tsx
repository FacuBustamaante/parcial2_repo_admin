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
    <div>
      <h1>Iniciar Sesión</h1>

      <form onSubmit={handleSubmit}>
        {error && (
          <div>
            {error}
          </div>
        )}

        <div>
          <label>
            Usuario
          </label>

          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            disabled={isLoading}
            placeholder="Tu usuario"
          />
        </div>

        <div>
          <label>
            Contraseña
          </label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
            placeholder="Tu contraseña"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Iniciando sesión…" : "Iniciar Sesión"}
        </button>
      </form>

      <p>
        ¿No tienes cuenta?{" "}

        <button onClick={() => navigate("/register")}>
          Registrarse
        </button>
      </p>
    </div>
  );
}