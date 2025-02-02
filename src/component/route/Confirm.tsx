import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthDialog = () => {
  const [open, setopen] = useState(true);
  const navigate = useNavigate();
  return (
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
  );
};
