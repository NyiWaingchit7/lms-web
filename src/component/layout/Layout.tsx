import { ReactNode, useEffect } from "react";
import { NavBar } from "./Navbar";
import { TagLine } from "./Tagline";
import { Footer } from "./Footer";
import { useAppDispatch } from "../../store/hooks";
import { getAppSetting } from "../../store/slice/appSlice";
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
