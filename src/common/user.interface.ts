import { Roles } from './enums/role';

export interface IPayload {
  sub: number;
  username: string;
  role: Roles;
}
export interface IPassword {
  oldPassword: string;
  newPassword: string;
}
