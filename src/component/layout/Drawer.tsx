import { Drawer } from "@mui/material";
import { Link } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { navItem } from "./Navbar";
interface Props {
  open: boolean;
  setOpen: (datt?: any) => void;
}
export const SideBarDrawer = ({ open, setOpen }: Props) => {
  return (
    <Drawer
      open={open}
      onClose={() => setOpen(false)}
      aria-modal="true"
      aria-hidden="false"
      className="w-screen relative lg:hidden"
      id="sidebar"
    >
      <div className="w-screen !overflow-hidden flex justify-center mt-20">
        <CloseIcon
          className="absolute top-5 right-5 text-white !text-3xl"
          onClick={() => setOpen(false)}
        />
        <div className=" flex flex-col gap-3 mt-10 px-3 text-white font-medium text-xl sm:text-3xl">
          {navItem.map((data) => (
            <Link className="" key={data.name} to={`/${data.path}`}>
              {data.name}
            </Link>
          ))}
        </div>
      </div>
    </Drawer>
  );
};
