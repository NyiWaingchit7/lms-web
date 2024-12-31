import { Link, useLocation } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
export const NavBar = () => {
  const location = useLocation();

  return (
    <div className="bg-green  sticky top-0 overflow-x-hidden z-10">
      <div className="container flex justify-between items-center">
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
                      location.pathname.includes(`/${item.path}`)
                        ? "nav-active"
                        : ""
                    }`}
                  >
                    {item.name} {location.pathname.includes(`/${item.path}`)}
                  </div>
                </Link>
              ))}
            </nav>
            <div className="lg:hidden">
              <MenuIcon className="text-white" />
            </div>
          </div>
        </div>
        <div className="">
          <button className="bg-black px-3 py-2 text-white rounded-md">
            Log in
          </button>
        </div>
      </div>
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
    path: "lectures",
  },
];
