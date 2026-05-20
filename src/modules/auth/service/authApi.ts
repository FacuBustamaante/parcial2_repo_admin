import apiClient from "../../../api/axiosInstance";
import type { UserPublic, RegisterPayload } from "../types/api";

const AUTH = "/auth";


// Login del usuario, devuelve un token de autenticación

/** 
export async function requestLogin(
  username: string,
  password: string,
): Promise<void> {
  const body = new URLSearchParams({ username, password });
  await apiClient.post(`${AUTH}/login`, body, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });
}
*/

export async function requestLogin(
  email: string,
  password: string,
): Promise<void> {

  const body = new URLSearchParams();

  body.append("username", email);
  body.append("password", password);

   await apiClient.post(`${AUTH}/login`, {
    email,
    password,
  });
}

export async function requestRegister(
  payload: RegisterPayload,
): Promise<void> {

  await apiClient.post(
    `${AUTH}/register`,
    payload,
  );
}    

/** Rehidrata el estado de autenticación leyendo el usuario desde el backend. 
No recibe el token: el navegador lo envía automáticamente vía cookie
httpOnly. Si la cookie es válida → 200 con el usuario. Si no → 401. */ 

export async function requestMe(): Promise<UserPublic> {
  const response = await apiClient.get<UserPublic>(`${AUTH}/me`);
  return response.data;
}


// Logout del usuario, invalida el token de autenticación
export async function requestLogout(): Promise<void> {
  await apiClient.post(`${AUTH}/logout`);
}
