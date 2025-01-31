import { AuthDialog } from "@/component/route/Confirm";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoutes = () => {
  const accessToken = localStorage.getItem("token");
  return accessToken ? <Outlet /> : <AuthDialog />;
};
