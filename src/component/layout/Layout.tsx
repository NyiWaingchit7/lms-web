import { useAppDispatch } from "@/store/hooks";
import { getAppSetting } from "@/store/slice/appSlice";
import { ReactNode, useEffect } from "react";
import { TagLine } from "./Tagline";
import { NavBar } from "./Navbar";
import { Footer } from "./Footer";

interface Props {
  children: ReactNode;
}
export const Layout = ({ children }: Props) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAppSetting());
  }, []);
  return (
    <div className="flex flex-col min-h-screen">
      <TagLine />
      <NavBar />
      <div className="flex-grow">{children}</div>
      <Footer />
    </div>
  );
};
