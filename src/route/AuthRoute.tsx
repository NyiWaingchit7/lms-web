import { Navigate, Outlet } from "react-router-dom";

export const AuthRoutes = () => {
  const accessToken = localStorage.getItem("token");
  return !accessToken ? <Outlet /> : <Navigate to={"/"} />;
};
