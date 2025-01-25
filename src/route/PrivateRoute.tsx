import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoutes = () => {
  const accessToken = localStorage.getItem("token");
  return accessToken ? <Outlet /> : <Navigate to={"/log-in"} />;
};
