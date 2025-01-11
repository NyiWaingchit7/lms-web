import { ReactNode } from "react";
import { NavBar } from "./Navbar";
import { TagLine } from "./Tagline";
import { Footer } from "./Footer";
interface Props {
  children: ReactNode;
}
export const Layout = ({ children }: Props) => {
  return (
    <div className="flex flex-col min-h-screen">
      <TagLine />
      <NavBar />
      <div className="flex-grow">{children}</div>
      <Footer />
    </div>
  );
};
