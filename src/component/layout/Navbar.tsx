import { Link } from "react-router-dom";

export const NavBar = () => {
  return (
    <div className="bg-gray-500 sticky top-0">
      <div className="container flex justify-between items-center">
        <div className="flex items-center gap-5 md:gap-32">
          <div className="">
            <Link to={"/"}>
              <img
                src="/logo.png"
                alt="logo"
                className="w-14 md:w-20 mx-auto"
              />
            </Link>
          </div>
          <div>
            <nav className=" items-center gap-3 text-white hidden lg:flex">
              {navItem.map((item, index) => (
                <div key={index}>{item.name}</div>
              ))}
            </nav>
            <div className="lg:hidden">
              <button className="bg-red-300 px-1 rounded-md">menu</button>
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
    path: "/",
  },
  {
    name: "Courses",
    path: "/lectures",
  },
];
