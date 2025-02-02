import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./slice/appSlice";
import courseReducer from "./slice/courseSlice";
import authReducer from "./slice/authSlice";

export const store = configureStore({
  reducer: {
    app: appReducer,
    courses: courseReducer,
    auth: authReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
