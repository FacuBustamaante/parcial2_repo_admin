import type { RoleStatus } from "./roles.constant";

export interface IUsuario {
  id: number;
  nombre: string;
  apellido: string;
  celular: string;
  email: string;
  activo: boolean;
  roles: RoleStatus[];
}
export interface IUsuariosResponse {
  data: IUsuario[];
}
