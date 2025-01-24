import {
  AccountLogin,
  AccountRegister,
  AuthSlice,
  ChangePassword,
  CreatePassword,
  ForgetPassword,
} from "@/type/auth";
import { fetchFunction } from "@/utils/useFetchFunction";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState: AuthSlice = {
  isLoading: false,
  error: null,
  profile: null,
  my_courses: [],
  otp_code: null,
};
export const getProfile = createAsyncThunk(
  "get/profile",
  async (_, thunkApi) => {
    try {
      const { data, response } = await fetchFunction({
        url: "auth/my-profile",
      });
      if (!response.ok) {
        toast.error(data.message);
      }
      thunkApi.dispatch(setProfile(null));
    } catch (error) {
      console.log(error);
    }
  }
);
export const accountRegister = createAsyncThunk(
  "account/register",
  async (option: AccountRegister, thunkApi) => {
    try {
      const { name, email, password } = option;
      const { data, response } = await fetchFunction({
        url: "auth/register",
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      if (!response.ok) {
        toast.error(data.message);
      } else {
        console.log(data.code);

        thunkApi.dispatch(setOTP(data.code));
      }
    } catch (error) {
      console.log(error);
    }
  }
);
export const registerVerify = createAsyncThunk(
  "account/register-verify",
  async (option: AccountRegister, thunkApi) => {
    try {
      const { name, email, password, code, onSuccess } = option;
      const { data, response } = await fetchFunction({
        url: "auth/verify",
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          password,
          code,
        }),
      });
      if (!response.ok) {
        toast.error(data.message);
      } else {
        onSuccess && onSuccess();
      }
    } catch (error) {
      console.log(error);
    }
  }
);
export const accountLogin = createAsyncThunk(
  "account/logins",
  async (option: AccountLogin, thunkApi) => {
    try {
      const { email, password } = option;
      const { data, response } = await fetchFunction({
        url: "auth/register",
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      if (!response.ok) {
        toast.error(data.message);
      } else {
        thunkApi.dispatch(setProfile(null));
      }
    } catch (error) {
      console.log(error);
    }
  }
);
export const forgetPassword = createAsyncThunk(
  "account/logins",
  async (option: ForgetPassword, thunkApi) => {
    try {
      const { email } = option;
      const { data, response } = await fetchFunction({
        url: "auth/forget-password",
        method: "POST",
        body: JSON.stringify({
          email,
        }),
      });
      if (!response.ok) {
        toast.error(data.message);
      } else {
        thunkApi.dispatch(setOTP(null));
      }
    } catch (error) {
      console.log(error);
    }
  }
);
export const forgetVerify = createAsyncThunk(
  "account/forget-verify",
  async (option: ForgetPassword, thunkApi) => {
    try {
      const { email, code } = option;
      const { data, response } = await fetchFunction({
        url: "auth/forget-verify",
        method: "POST",
        body: JSON.stringify({
          email,
          code,
        }),
      });
      if (!response.ok) {
        toast.error(data.message);
      } else {
        thunkApi.dispatch(setOTP(null));
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export const createPassword = createAsyncThunk(
  "account/create-passwored",
  async (option: CreatePassword, thunkApi) => {
    try {
      const { new_password, confirm_password } = option;
      const { data, response } = await fetchFunction({
        url: "auth/forget-password-change",
        method: "POST",
        body: JSON.stringify({
          new_password,
          confirm_password,
        }),
      });
      if (!response.ok) {
        toast.error(data.message);
      } else {
        toast.success(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export const changePassword = createAsyncThunk(
  "account/change-passwored",
  async (option: ChangePassword, thunkApi) => {
    try {
      const { old_password, new_password, confirm_password } = option;
      const { data, response } = await fetchFunction({
        url: "auth/change-password",
        method: "POST",
        body: JSON.stringify({
          old_password,
          new_password,
          confirm_password,
        }),
      });
      if (!response.ok) {
        toast.error(data.message);
      } else {
        toast.success(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
    setOTP: (state, action) => {
      state.otp_code = action.payload;
    },
  },
});

export const { setProfile, setOTP } = authSlice.actions;
export default authSlice.reducer;
