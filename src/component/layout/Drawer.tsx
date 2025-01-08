import { Drawer } from "@mui/material";
import { navItem } from "./Navbar";
import { Link } from "react-router-dom";
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
      className="lg:hidden"
    >
      <div className="w-64 bg-green min-h-screen">
        <div className="flex flex-col gap-3 mt-10 px-3 text-white">
          {navItem.map((data) => (
            <Link className="" key={data.name} to={`/${data.path}`}>
              {data.name}
              <hr className="mt-3" />
            </Link>
          ))}
        </div>
      </div>
    </Drawer>
  );
};
