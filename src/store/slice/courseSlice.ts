import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CourseSlice } from "@/type/course";
import { fetchFunction } from "@/utils/useFetchFunction";
import toast from "react-hot-toast";
import { buildQuery } from "@/utils/buildQury";
const initialState: CourseSlice = {
  isLoading: false,
  items: [],
  error: null,
  has_more_page: false,
  page: 1,
  detail: null,
  loadmore_button: false,
  links: [],
  total: 0,
};

export const handleGetCourses = createAsyncThunk(
  "get/courses",
  async (
    {
      page = 1,
      searchKey = "",
      isPremium = "",
      categoryId = null,
    }: {
      page?: number | string;
      searchKey?: string;
      isPremium?: string | boolean;
      categoryId?: null | number | string;
    },
    thunkApi
  ) => {
    try {
      const param = {
        page: page.toString(),
        searchKey,
        isPremium: isPremium?.toString(),
        categoryId: categoryId?.toString() || "",
        limit: "9",
      };
      // const queryString = new URLSearchParams(param).toString();
      thunkApi.dispatch(courseLoading(true));
      const query = buildQuery(param);
      const { data, response } = await fetchFunction({
        url: `lectures${query}`,
      });
      if (!response.ok) {
        toast.error(data.message);
        return;
      } else {
        thunkApi.dispatch(setCourses(data.data));
        thunkApi.dispatch(hasMorePage(data.has_more_pages));
        thunkApi.dispatch(setLinks(data.links));
        thunkApi.dispatch(setTotal(data.total));
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
      state.items = action.payload;
    },
    setCourseDetail: (state, action) => {
      state.detail = action.payload;
    },
    pageIncrement: (state) => {
      state.page++;
    },
    hasMorePage: (state, action) => {
      state.has_more_page = action.payload;
    },
    courseLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setLoadMore: (state, action) => {
      state.loadmore_button = action.payload;
    },
    setLinks: (state, action) => {
      state.links = action.payload;
    },
    clearCourses: (state) => {
      state.items = [];
    },
    setTotal: (state, action) => {
      state.total = action.payload;
    },

    cleanCourseSlice: (state) => {
      state.isLoading = false;
      state.items = [];
      state.error = null;
      state.has_more_page = false;
      state.page = 1;
      state.detail = null;
      state.loadmore_button = false;
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
  cleanCourseSlice,
  setLinks,
  setTotal,
} = courseSlice.actions;
export default courseSlice.reducer;
