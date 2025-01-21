import { useState } from "react";
import TextField from "@mui/material/TextField";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
interface Props {
  label: string;
  value: string;
  onChange: (data?: any) => void;
}
export const PasswordInput = ({ label, value, onChange }: Props) => {
  const [show, setShow] = useState("password");

  return (
    <TextField
      autoComplete="off"
      size="small"
      fullWidth
      required
      type={show}
      label={label}
      value={value || ""}
      onChange={(e) => {
        onChange(e.target.value);
      }}
      InputProps={{
        endAdornment:
          show === "text" ? (
            <RemoveRedEyeIcon
              className="me-2 opacity-50 cursor-pointer"
              onClick={() => setShow("password")}
            />
          ) : (
            <VisibilityOffIcon
              className="me-2 opacity-50 cursor-pointer"
              onClick={() => setShow("text")}
            />
          ),
      }}
    />
  );
};
