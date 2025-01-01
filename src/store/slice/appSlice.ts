import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AppSlice } from "../../type/app";
import { fetchFunction } from "../../utils/useFetchFunction";
import toast from "react-hot-toast";
const initialState: AppSlice = {
  isLoading: false,
  error: null,
  lectures: [],
  tagLines: [],
  setting: null,
  pages: [],
  payment: [],
};
export const getAppLecture = createAsyncThunk(
  "get/lecture",
  async (_, thunkApi) => {
    try {
      thunkApi.dispatch(setAppLoading(true));
      const { response, data } = await fetchFunction({
        url: "lectures",
      });
      if (!response.ok) {
        toast.error(data.message);
        return;
      }

      thunkApi.dispatch(setAppLecture(data.data.data));
      thunkApi.dispatch(setAppLoading(false));
    } catch (error) {
      console.log(error);
    }
  }
);
export const getAppTagLine = createAsyncThunk(
  "get/lecture",
  async (_, thunkApi) => {
    try {
      const { response, data } = await fetchFunction({
        url: "tag-lines",
      });
      if (!response.ok) {
        toast.error(data.message);
      }
      thunkApi.dispatch(setAppTagline(data.data.data));
    } catch (error) {
      console.log(error);
    }
  }
);
export const appSlice = createSlice({
  name: "appSlice",
  initialState,
  reducers: {
    setAppLecture: (state, action) => {
      state.lectures = action.payload;
    },
    setAppTagline: (state, action) => {
      state.lectures = action.payload;
    },
    setAppSetting: (state, action) => {
      state.lectures = action.payload;
    },
    setAppPages: (state, action) => {
      state.lectures = action.payload;
    },
    setAppPayment: (state, action) => {
      state.lectures = action.payload;
    },
    setAppLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  setAppLecture,
  setAppPages,
  setAppPayment,
  setAppSetting,
  setAppTagline,
  setAppLoading,
} = appSlice.actions;
export default appSlice.reducer;
