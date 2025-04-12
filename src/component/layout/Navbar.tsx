import { Link, useLocation } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { SideBarDrawer } from "./Drawer";
import { useAppSelector } from "@/store/hooks";
import { Avatar } from "@mui/material";
export const NavBar = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const token = localStorage.getItem("token");
  const { profile } = useAppSelector((store) => store.auth);

  return (
    <div className="bg-green  sticky top-0 z-10">
      <div className="container flex justify-between items-center overflow-x-hidden">
        <div className="flex items-center gap-5 md:gap-32">
          <div className="">
            <Link to={"/"}>
              <img
                src="/logo.png"
                alt="logo"
                className="w-14 md:w-20 mx-auto fill-white"
              />
            </Link>
          </div>
          <div>
            <nav className=" items-center gap-3 text-white hidden lg:flex">
              {navItem.map((item, index) => (
                <Link to={`/${item.path}`} key={index}>
                  <div
                    className={`text-[15px] nav-underline transition-all ease-in-out duration-300  ${
                      location.pathname === `/${item.path}` ? "nav-active" : ""
                    }`}
                  >
                    {item.name} {location.pathname.includes(`/${item.path}`)}
                  </div>
                </Link>
              ))}
            </nav>
            <div className="lg:hidden">
              <MenuIcon className="text-white" onClick={() => setOpen(true)} />
            </div>
          </div>
        </div>
        <div>
          {token ? (
            <div className="flex gap-2">
              <div className=" flex-col items-end text-white lg:flex hidden">
                <h3 className="font-medium text-sm"> {profile?.name} </h3>
                <small> {profile?.email} </small>
              </div>
              <Link to={"/profile"}>
                <Avatar
                  alt={profile?.name}
                  src={profile?.assetUrl || "/default.jpg"}
                />
              </Link>
            </div>
          ) : (
            <div className="flex gap-3 items-center">
              <Link to={"/log-in"}>
                <button className="btn-login">Log in</button>
              </Link>
              <Link to={"/register"}>
                <p className="text-lg text-white cursor-pointer">Register</p>
              </Link>
            </div>
          )}
        </div>
      </div>
      <SideBarDrawer open={open} setOpen={setOpen} />
    </div>
  );
};

export const navItem = [
  {
    name: "Home",
    path: "",
  },
  {
    name: "Courses",
    path: "courses",
  },
];
