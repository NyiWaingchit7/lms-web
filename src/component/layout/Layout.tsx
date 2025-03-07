import { useAppDispatch } from "@/store/hooks";
import { getAppSetting } from "@/store/slice/appSlice";
import { ReactNode, useEffect } from "react";
import { TagLine } from "./Tagline";
import { NavBar } from "./Navbar";
import { Footer } from "./Footer";
import { getProfile } from "@/store/slice/authSlice";

interface Props {
  children: ReactNode;
}
export const Layout = ({ children }: Props) => {
  const token = localStorage.getItem("token");
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAppSetting());
    token && dispatch(getProfile());
  }, []);
  return (
    <div className="flex flex-col min-h-screen">
      {/* <TagLine /> */}
      <NavBar />
      <div className="flex-grow">{children}</div>
      <Footer />
    </div>
  );
};
