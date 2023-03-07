export interface LoginType {
  email: string;
  password: string;
}

export interface ResetPasswordType {
  new_password: string;
  ver_new_password: string;
}

export interface ChangePasswordType {
  old_password: string;
  new_password: string;
  ver_new_password: string;
}

export interface ForgetPasswordType {
  email: string;
}

export interface UserType {
  id: string;
  first_name: string;
  last_name: string;
  profile_picture: string;
  email: string;
  token: string;
  username: string;
}

export interface CompleteProfileType {
  first_name: string;
  last_name: string;
}
