import { BrowserRouter, Route, Routes } from "react-router-dom";

import App from "@/App";
import ScrollToTop from "@/component/layout/ScrollTop";
import { CoursesPage } from "@/pages/lecture/Lectures";
import { Login } from "@/pages/login/Login";
import { Register } from "@/pages/register/Register";
import { CoursesDetail } from "@/pages/lecture/LectureDetail";
import { LectureWithCategory } from "@/pages/category/LectureWithCategory";
import { NotFound } from "@/component/error/NotFount";
import { ChangePassword } from "@/pages/change-password/ChangePassword";
import { ForgetPassword } from "@/pages/forget-password/ForgetPassword";
import { ForgetChangePassword } from "@/pages/forget-change/ForgetChangePassword";
import { Checkout } from "@/pages/checkout/Checkout";

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
        <Route path="/change-password" Component={ChangePassword} />
        <Route path="/forget-password" Component={ForgetPassword} />
        <Route
          path="/forget-password-change"
          Component={ForgetChangePassword}
        />
        <Route path="/checkout" Component={Checkout} />
      </Routes>
    </BrowserRouter>
  );
};
