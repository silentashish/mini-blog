export interface LoginType {
  email: string;
  password: string;
}

export interface ResetPasswordType {
  new_password: string;
  ver_new_password: string;
}

export interface ForgetPasswordType {
  email: string;
}
