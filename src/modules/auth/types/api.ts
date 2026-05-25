export type UserRole = 'ADMIN' | 'STOCK' | 'PEDIDOS';

export interface UserPublic {
  id: number;
  username: string;
  full_name: string;
  email: string;
  roles: UserRole;
  disabled: boolean;
}

export type RegisterPayload = {
  nombre: string;
  apellido: string;
  email: string;
  celular?: string;
  password: string;
};