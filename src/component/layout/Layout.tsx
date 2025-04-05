import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getAppSetting } from "@/store/slice/appSlice";
import { ReactNode, useEffect } from "react";
import { NavBar } from "./Navbar";
import { Footer } from "./Footer";
import { getProfile } from "@/store/slice/authSlice";

interface Props {
  children: ReactNode;
}
export const Layout = ({ children }: Props) => {
  const token = localStorage.getItem("token");
  const { profile } = useAppSelector((store) => store.auth);
  const { lastFetch } = useAppSelector((store) => store.app);
  const dispatch = useAppDispatch();
  const now = Date.now();
  const duration = 15 * 60 * 1000;

  useEffect(() => {
    if (!lastFetch || now - lastFetch > duration) {
      dispatch(getAppSetting());
    }
    token && !profile && dispatch(getProfile());
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
