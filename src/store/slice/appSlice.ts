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
  lastFetch: null,
  faq: [
    {
      question: "What courses are available on the website?",
      answer:
        "We offer a wide range of courses, including coding, design, marketing, business, and personal development. Check our course catalog for the full list.",
    },
    {
      question: "Are the courses self-paced?",
      answer:
        "Yes, most courses are self-paced, allowing you to learn at your convenience. Some live sessions or scheduled events may have fixed timings.",
    },
    {
      question: "Do I get a certificate after completing a course?",
      answer:
        "Yes, certificates are provided for most courses upon successful completion. Check the course details for specific information.",
    },
    {
      question: "Is there support available if I face issues?",
      answer:
        "Absolutely! You can contact our support team via email or live chat, available 24/7.",
    },

    {
      question: "Can I access the courses on mobile?",
      answer:
        "Yes, our platform is mobile-friendly, and you can learn on the go using any device.",
    },
    {
      question: "How can I stay updated on new courses and offers?",
      answer:
        "Sign up for our newsletter or follow us on social media to get updates on the latest courses and exclusive discounts.",
    },
  ],
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

export const getPayment = createAsyncThunk(
  "get/payment",
  async (_, thunkapi) => {
    try {
      const { response, data } = await fetchFunction({
        url: "payments",
      });
      if (!response.ok) {
        toast.error(data.message);
      } else {
        thunkapi.dispatch(setAppPayment(data.data));
        console.log(data.data);
      }
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
      state.lastFetch = Date.now();
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
