import axios, { type AxiosError, type AxiosResponse } from "axios";
import { getApiBase } from "./config";
import { useAuthStore } from "../stores/useAuthStore";


// ───────────────────────────────────────────────────────────────────────

// Instancia de Axios
// axios.create({...}) crea una instancia personalizada de Axios llamada apiClient. Ahí definís configuración global para todas las requests: baseURL para no repetir la URL de 
// la API, withCredentials: true para enviar cookies HTTPOnly automáticamente, timeout para cancelar requests lentas y headers globales como Content-Type: application/json.

// ───────────────────────────────────────────────────────────────────────


export const apiClient = axios.create({
  baseURL: getApiBase(),
  withCredentials: true, // ¡Importante! Incluye cookies httpOnly
  timeout: 10000, 
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

/**  
 
¿Qué es un interceptor?  --> es una función que Axios ejecuta:

ANTES de enviar una request
o DESPUÉS de recibir una response 

*/

// ───────────────────────────────────────────────────────────────────────

// INTERCEPTOR DE REQUEST se ejecuta antes de que cada petición salga al backend. Recibe el objeto config de la request y puede modificarlo (por ejemplo agregar tokens JWT o 
// headers). En este caso solo devuelve la configuración sin cambios, y si ocurre un error antes de enviar la request lo muestra en consola y lo vuelve a lanzar con Promise.reject(error).

// ───────────────────────────────────────────────────────────────────────
apiClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error: AxiosError) => {
    console.error("Error en request:", error);
    return Promise.reject(error);
  },
);

// ───────────────────────────────────────────────────────────────────────
// INTERCEPTOR DE RESPONSE: se ejecuta cuando el backend responde. Si la respuesta fue exitosa, devuelve la response normalmente. 
// Si hay error, revisa si el backend devolvió 401 Unauthorized; si pasa eso, limpia la sesión del usuario con clearSession() porque significa que el login expiró o el usuario  ya no está autenticado.
// ───────────────────────────────────────────────────────────────────────
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      console.warn("Sesión expirada (401), limpiando...");
      useAuthStore.getState().clearSession();
    }
    return Promise.reject(error);
  },
);


export default apiClient;
