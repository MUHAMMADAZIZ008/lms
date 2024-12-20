export interface IforgetPassword {
  email: string;
}
export interface IRestorationPassword {
  userId: number;
  newPassword: string;
  otp: string;
}
