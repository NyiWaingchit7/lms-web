import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AppSlice } from "@/type/app";
import { fetchFunction } from "@/utils/useFetchFunction";
import toast from "react-hot-toast";
const initialState: AppSlice = {
  isLoading: false,
  error: null,
  lectures: [],
  tagLines: [],
  free_lectures: [],
  popular_lectures: [],
  setting: null,
  pages: [],
  payment: [],
  category: [],
  counts: null,
};
export const getAppLecture = createAsyncThunk(
  "get/lecture",
  async (_, thunkApi) => {
    try {
      thunkApi.dispatch(setAppLoading(true));
      const preLec = await getAppPreLecture();
      const freeLec = await getAppFreeLecture();
      const popularLec = await getAppPopularLecture();

      thunkApi.dispatch(setAppLecture(preLec));
      thunkApi.dispatch(setAppFree(freeLec));
      thunkApi.dispatch(setPopularLecture(popularLec));

      thunkApi.dispatch(setAppLoading(false));
    } catch (error) {
      console.log(error);
    }
  }
);
export const getAppPreLecture = async () => {
  try {
    const { response, data } = await fetchFunction({
      url: "lectures?isPremium=true",
    });
    if (!response.ok) {
      toast.error(data.message);
      return;
    }
    return data.data;
  } catch (error) {
    console.log(error);
  }
};
export const getAppFreeLecture = async () => {
  try {
    const { response, data } = await fetchFunction({
      url: "lectures?isPremium=false",
    });
    if (!response.ok) {
      toast.error(data.message);
      return;
    }
    return data.data;
  } catch (error) {
    console.log(error);
  }
};
export const getAppPopularLecture = async () => {
  try {
    const { response, data } = await fetchFunction({
      url: "popular-lectures",
    });
    if (!response.ok) {
      toast.error(data.message);
      return;
    }
    return data.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAppSetting = createAsyncThunk(
  "get/lecture",
  async (_, thunkApi) => {
    try {
      const { response, data } = await fetchFunction({
        url: "settings",
      });
      if (!response.ok) {
        toast.error(data.message);
      }
      thunkApi.dispatch(setAppSetting(data.settings));
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
      thunkApi.dispatch(setAppTagline(data.data));
    } catch (error) {
      console.log(error);
    }
  }
);
export const getCategory = createAsyncThunk(
  "get/lecture",
  async (_, thunkApi) => {
    try {
      const { response, data } = await fetchFunction({
        url: "categories",
      });
      if (!response.ok) {
        toast.error(data.message);
      }
      thunkApi.dispatch(setCategory(data.data));
    } catch (error) {
      console.log(error);
    }
  }
);
export const getHome = createAsyncThunk("get/home", async (_, thunkApi) => {
  try {
    const { response, data } = await fetchFunction({
      url: "home",
    });
    if (!response.ok) {
      toast.error(data.message);
    }

    thunkApi.dispatch(setAppCount(data));
  } catch (error) {
    console.log(error);
  }
});
export const appSlice = createSlice({
  name: "appSlice",
  initialState,
  reducers: {
    setAppLecture: (state, action) => {
      state.lectures = action.payload;
    },
    setPopularLecture: (state, action) => {
      state.popular_lectures = action.payload;
    },
    setAppFree: (state, action) => {
      state.free_lectures = action.payload;
    },
    setAppTagline: (state, action) => {
      state.tagLines = action.payload;
    },
    setAppSetting: (state, action) => {
      state.setting = action.payload;
    },
    setAppPages: (state, action) => {
      state.pages = action.payload;
    },
    setAppPayment: (state, action) => {
      state.payment = action.payload;
    },
    setAppLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setAppCount: (state, action) => {
      state.counts = action.payload;
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
  setAppFree,
  setCategory,
  setPopularLecture,
  setAppCount,
} = appSlice.actions;
export default appSlice.reducer;
