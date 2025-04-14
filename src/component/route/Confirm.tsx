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
        <DialogTitle className="text-green !font-bold !text-xl">
          Authentication
        </DialogTitle>
        <DialogContent className="w-[350px]">
          You need to log in first!
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
