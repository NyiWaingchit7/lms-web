import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CourseSlice } from "../../type/course";
import { fetchFunction } from "../../utils/useFetchFunction";
import toast from "react-hot-toast";
const initialState: CourseSlice = {
  isLoading: false,
  items: [],
  error: null,
  has_more_page: false,
  page: 1,
  detail: null,
};

export const handleGetCourses = createAsyncThunk(
  "get/courses",
  async (
    {
      page = 1,
      searchKey = "",
      isPremium = "",
    }: {
      page?: number;
      searchKey?: string;
      isPremium?: string;
    },
    thunkApi
  ) => {
    try {
      const param = {
        page: page.toString(),
        searchKey,
        isPremium: isPremium?.toString(),
      };
      const queryString = new URLSearchParams(param).toString();
      const { data, response } = await fetchFunction({
        url: `lectures?${queryString}`,
      });
      if (!response.ok) {
        toast.error(data.message);
        return;
      } else {
        thunkApi.dispatch(setCourses(data.data.data));
        thunkApi.dispatch(courseLoading(false));
      }
    } catch (error) {
      console.log(error);
    }
  }
);
export const courseDetail = createAsyncThunk(
  "detail/courses",
  async ({ id }: { id: number }, thunkApi) => {
    try {
      const { data, response } = await fetchFunction({ url: `lectures/${id}` });
      if (!response.ok) {
        toast.error(data.message);
      } else {
        thunkApi.dispatch(setCourseDetail(data.lecture));
        thunkApi.dispatch(courseLoading(false));
      }
    } catch (error) {
      console.log(error);
    }
  }
);
export const courseSlice = createSlice({
  name: "course/slice",
  initialState,
  reducers: {
    setCourses: (state, action) => {
      state.items = [...state.items, ...action.payload];
    },
    setCourseDetail: (state, action) => {
      state.detail = action.payload;
    },
    pageIncrement: (state, action) => {
      state.page = action.payload;
    },
    hasMorePage: (state, action) => {
      state.has_more_page = action.payload;
    },
    courseLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    clearCourses: (state) => {
      state.items = [];
    },
  },
});
export const {
  setCourses,
  pageIncrement,
  hasMorePage,
  courseLoading,
  clearCourses,
  setCourseDetail,
} = courseSlice.actions;
export default courseSlice.reducer;
