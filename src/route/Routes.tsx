import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CoursesPage } from "../pages/lecture/Lectures";
import { CoursesDetail } from "../pages/lecture/LectureDetail";
import { Login } from "../pages/login/Login";
import { NotFound } from "../component/error/NotFount";
import { Register } from "../pages/register/Register";
import App from "../App";
import { LectureWithCategory } from "../pages/category/LectureWithCategory";
import ScrollToTop from "../component/layout/ScrollTop";

export const Router = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" Component={App} />
        <Route path="/courses" Component={CoursesPage} />
        <Route path="/log-in" Component={Login} />
        <Route path="/register" Component={Register} />

        <Route path="/courses/:id" Component={CoursesDetail} />
        <Route
          path="/categories/:id/:category"
          Component={LectureWithCategory}
        />

        <Route path="*" Component={NotFound} />
      </Routes>
    </BrowserRouter>
  );
};
