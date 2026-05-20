// ───────────────────────────────────────────────────────────────────────
// Este módulo se encarga de obtener la URL base de la API desde las variables de entorno, y de validar que esté presente. Si no se encuentra, lanza un error para evitar problemas posteriores en la aplicación.
// ───────────────────────────────────────────────────────────────────────

export function getApiBase(): string {
  const raw = import.meta.env.VITE_API_BASE_URL;
  if (!raw || typeof raw !== "string") {
    throw new Error("Falta VITE_API_BASE_URL en .env");
  }
  return raw.replace(/\/$/, "");
}
