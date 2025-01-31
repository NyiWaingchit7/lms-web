import { AuthDialog } from "@/component/route/Confirm";
import { Outlet } from "react-router-dom";

export const PrivateRoutes = () => {
  const accessToken = localStorage.getItem("token");
  return accessToken ? <Outlet /> : <AuthDialog />;
};
