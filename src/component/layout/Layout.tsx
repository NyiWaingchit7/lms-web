import { ReactNode } from "react";
import { NavBar } from "./Navbar";
import { TagLine } from "./Tagline";
import { Footer } from "./Footer";
interface Props {
  children: ReactNode;
}
export const Layout = ({ children }: Props) => {
  return (
    <>
      <TagLine />
      <NavBar />
      <div className="min-h-screen">{children}</div>
      <Footer />
    </>
  );
};
