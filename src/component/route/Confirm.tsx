import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
interface Props {
  children: ReactNode;
}
export const AuthDialog = ({ children }: Props) => {
  const [open, setopen] = useState(true);
  const navigate = useNavigate();
  return (
    <div>
      {children}
      <Dialog open={open} className=" mx-auto">
        <DialogTitle className="!font-semibold !text-xl">
          <i className="fa-solid fa-lock text-yellow-400"></i> Hold up!
        </DialogTitle>
        <DialogContent className="w-[450px] text-xs md:text-sm">
          This area is for VIPs only — and that means logged-in users. Wanna
          sign in now?
        </DialogContent>
        <DialogActions>
          <button
            className="no-btn"
            onClick={() => {
              setopen(false);
              history.back();
            }}
          >
            No
          </button>
          <button
            className="yes-btn"
            onClick={() => {
              navigate("/log-in");
            }}
          >
            Yes
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
