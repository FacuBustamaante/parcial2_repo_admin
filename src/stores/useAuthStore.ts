import { create } from "zustand";
import * as authApi from "../modules/auth/service/authApi";
import type {
  UserPublic,
  RegisterPayload,
  UserRole,
} from "../modules/auth/types/api";

// ───────────────────────────────────────────────────────────────────────
// store global de autenticación usando Zustand. El store guarda únicamente información no sensible del usuario (user, isAuthenticated, isLoading, error), mientras que el JWT real vive en una cookie HTTPOnly manejada por el navegador y el backend. La idea es que el frontend nunca tenga acceso directo al token, aumentando la seguridad. El create<AuthState>() define tanto el estado como las funciones para manejar login, logout, registro y validación de sesión.
// ───────────────────────────────────────────────────────────────────────

interface AuthState {
  user: UserPublic | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  hasRole: (...roles: UserRole[]) => boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  clearSession: () => void;
  setError: (msg: string | null) => void;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,

  setError: (msg) => set({ error: msg }),

  // ───────────────────────────────────────────────────────────────────────
  // hasRole permite verificar si el usuario tiene ciertos roles para controlar permisos o rutas protegidas.
  // ───────────────────────────────────────────────────────────────────────



  // TODO Revisar roesl y role 
 hasRole: (...roles: UserRole[]) => {
    const user = get().user;

    if (!user) return false;

    return user.roles.some((role) =>
      roles.includes(role),
    );
  },

  // ───────────────────────────────────────────────────────────────────────
  // clearSession sirve para borrar rápidamente la sesión desde cualquier parte de la app, por ejemplo cuando un interceptor de Axios detecta un 401 Unauthorized
  // ───────────────────────────────────────────────────────────────────────

  clearSession: () =>
    set({ user: null, isAuthenticated: false, isLoading: false, error: null }),

  // ───────────────────────────────────────────────────────────────────────
  // checkAuth se ejecuta normalmente al iniciar la aplicación para rehidratar la sesión. Como la cookie HTTPOnly viaja automáticamente al backend, el frontend llama a /auth/me; si la cookie sigue siendo válida, el backend devuelve el usuario y Zustand actualiza el store como autenticado. Si falla, el usuario queda anónimo.
  // ───────────────────────────────────────────────────────────────────────

  checkAuth: async () => {
    set({ isLoading: true, error: null });
    try {
      const user = await authApi.requestMe();
      set({ user, isAuthenticated: true, isLoading: false });
    } catch {
      set({ user: null, isAuthenticated: false, isLoading: false });
    }
  },

  // ───────────────────────────────────────────────────────────────────────
  // login primero envía usuario y contraseña al backend, el backend crea la cookie HTTPOnly, y luego el frontend llama nuevamente a /me para obtener los datos del usuario y guardarlos en el store.
  // ───────────────────────────────────────────────────────────────────────

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      await authApi.requestLogin(email, password);
      const user = await authApi.requestMe();
      set({ user, isAuthenticated: true, isLoading: false });
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Error de inicio de sesión";
      set({ user: null, isAuthenticated: false, isLoading: false, error: msg });
      throw e;
    }
  },

  // ───────────────────────────────────────────────────────────────────────
  // register registra al usuario y luego reutiliza login para iniciar sesión automáticamente después del registro.
  // ───────────────────────────────────────────────────────────────────────

  register: async (payload) => {
    set({ isLoading: true, error: null });
    try {
      await authApi.requestRegister(payload);
      set({ isLoading: false });
      await get().login(payload.email, payload.password);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Error al registrarse";
      set({ isLoading: false, error: msg });
      throw e;
    }
  },

  // ───────────────────────────────────────────────────────────────────────
  //logout intenta invalidar la sesión en el backend, pero incluso si falla la red igualmente limpia el estado local para ocultar contenido protegido.
  // ───────────────────────────────────────────────────────────────────────

  logout: async () => {
    try {
      await authApi.requestLogout();
    } catch {
      // Aun si falla la red, limpiamos el estado local: el usuario
      // dejará de ver contenido protegido y un eventual 401 posterior
      // terminará de sincronizar la cookie.
    }
    set({ user: null, isAuthenticated: false, error: null, isLoading: false });
  },
}));
