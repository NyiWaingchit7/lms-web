import { Course } from "./course";
import { Purchase } from "./purchase";

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
  Purchase: Purchase[];
  lectures: Course[];
}

export interface AuthSlice {
  isLoading: boolean;
  profile: Profile | null;
  error: Error | null;
  my_courses: Course[];
  token: string;
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
  email: string;
  new_password: string;
  confirm_password: string;
}
export interface EditAccount extends BaseOption {
  name: string;
  email: string;
  phone?: string;
  assetUrl: string;
}
