import {
  AccountLogin,
  AccountRegister,
  AuthSlice,
  ChangePassword,
  CreatePassword,
  EditAccount,
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
  token: "",
};
export const getProfile = createAsyncThunk(
  "get/profile",
  async (_, thunkApi) => {
    try {
      const { data, response } = await fetchFunction({
        url: "auth/my-profile",
      });
      if (!response.ok) {
        data.message && toast.error(data.message);
      } else {
        thunkApi.dispatch(setProfile(data.student));
      }
    } catch (error) {
      console.log(error);
    }
  }
);
export const accountRegister = createAsyncThunk(
  "account/register",
  async (option: AccountRegister) => {
    try {
      const { name, email, password, onSuccess } = option;
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
        data.message && toast.error(data.message);
      } else {
        onSuccess && onSuccess(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }
);
export const registerVerify = createAsyncThunk(
  "account/register-verify",
  async (option: AccountRegister) => {
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
        data.message && toast.error(data.message);
      } else {
        localStorage.setItem("token", data.token);

        onSuccess && onSuccess();
      }
    } catch (error) {
      console.log(error);
    }
  }
);
export const accountLogin = createAsyncThunk(
  "account/logins",
  async (option: AccountLogin) => {
    try {
      const { email, password, onSuccess } = option;
      const { data, response } = await fetchFunction({
        url: "auth/log-in",
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      if (!response.ok) {
        data.message && toast.error(data.message);
      } else {
        onSuccess && onSuccess();
        localStorage.setItem("token", data.token);
      }
    } catch (error) {
      console.log(error);
    }
  }
);
export const forgetPassword = createAsyncThunk(
  "account/forget-password",
  async (option: ForgetPassword) => {
    try {
      const { email, onSuccess } = option;
      const { data, response } = await fetchFunction({
        url: "auth/forget-password",
        method: "POST",
        body: JSON.stringify({
          email,
        }),
      });
      if (!response.ok) {
        data.message && toast.error(data.message);
      } else {
        onSuccess && onSuccess();
      }
    } catch (error) {
      console.log(error);
    }
  }
);
export const forgetVerify = createAsyncThunk(
  "account/forget-verify",
  async (option: ForgetPassword) => {
    try {
      const { email, code, onSuccess } = option;
      const { data, response } = await fetchFunction({
        url: "auth/forget-verify",
        method: "POST",
        body: JSON.stringify({
          email,
          code,
        }),
      });
      if (!response.ok) {
        data.message && toast.error(data.message);
      } else {
        onSuccess && onSuccess();
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export const createPassword = createAsyncThunk(
  "account/create-passwored",
  async (option: CreatePassword) => {
    try {
      const { new_password, confirm_password, email, onSuccess } = option;
      const { data, response } = await fetchFunction({
        url: "auth/forget-password-change",
        method: "POST",
        body: JSON.stringify({
          new_password,
          confirm_password,
          email,
        }),
      });
      if (!response.ok) {
        data.message && toast.error(data.message);
      } else {
        onSuccess && onSuccess();
        toast.success(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export const changePassword = createAsyncThunk(
  "account/change-passwored",
  async (option: ChangePassword) => {
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
        data.message && toast.error(data.message);
      } else {
        toast.success(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export const myProfile = createAsyncThunk("my-profile", async (_, thunkApi) => {
  try {
    const { response, data } = await fetchFunction({ url: "auth/my-profile" });
    if (!response.ok) {
      data.message && toast.error(data.message);
      return;
    } else {
      thunkApi.dispatch(setProfile(data.student));
    }
  } catch (error) {
    console.log(error);
  }
});

export const editProfile = createAsyncThunk(
  "my-profile",
  async (option: EditAccount, thunkApi) => {
    try {
      const { onSuccess, ...rest } = option;
      const { response, data } = await fetchFunction({
        url: "auth/edit-profile",
        method: "POST",
        body: JSON.stringify({ ...rest }),
      });
      if (!response.ok) {
        data.message && toast.error(data.message);
        return;
      } else {
        thunkApi.dispatch(setProfile(data.student));
        onSuccess && onSuccess();
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
      state.profile = { ...state.profile, ...action.payload };
    },

    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { setProfile, setToken } = authSlice.actions;
export default authSlice.reducer;
