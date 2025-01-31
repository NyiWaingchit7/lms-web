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
import { Toaster } from "react-hot-toast";
import { PrivateRoutes } from "./PrivateRoute";
import { Profile } from "@/pages/profile/Profile";
import ErrorBoundary from "@/component/error/ErrorBoundary";

export const Router = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Toaster position={"top-right"} toastOptions={{ duration: 3000 }} />
      <ErrorBoundary>
        <Routes>
          <Route path="/" Component={App} />
          <Route path="/courses" Component={CoursesPage} />
          <Route path="/courses/:id" Component={CoursesDetail} />
          <Route
            path="/categories/:id/:category"
            Component={LectureWithCategory}
          />
          <Route path="*" Component={NotFound} />
          <Route path="/forget-password" Component={ForgetPassword} />
          <Route
            path="/forget-password-change"
            Component={ForgetChangePassword}
          />
          <Route path="/register" Component={Register} />
          <Route path="/log-in" Component={Login} />
          <Route element={<PrivateRoutes />}>
            <Route path="/change-password" Component={ChangePassword} />
            <Route path="/checkout" Component={Checkout} />
            <Route path="/profile" Component={Profile} />
          </Route>
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};
