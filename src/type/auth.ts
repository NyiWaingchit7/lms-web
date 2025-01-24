import { Course } from "./course";

export interface BaseOption {
  onSuccess?: (data?: any) => void;
}

export interface Profile {
  id?: number;
  name: string;
  email: string;
  password?: string;
  phone?: string;
  assetUrl: string;
  token: string;
}

export interface AuthSlice {
  isLoading: boolean;
  profile: Profile | null;
  error: Error | null;
  my_courses: Course[];
  otp_code: number | null;
}

export interface AccountRegister extends BaseOption {
  name: string;
  email: string;
  password: string;
  code?: number;
}
export interface AccountLogin extends BaseOption {
  email: string;
  password: string;
}

export interface ChangePassword extends BaseOption {
  new_password: string;
  confirm_password: string;
  old_password: string;
}

export interface ForgetPassword extends BaseOption {
  email: string;
  code?: number;
}

export interface CreatePassword extends BaseOption {
  new_password: string;
  confirm_password: string;
}
