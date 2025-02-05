import { useState } from "react";
import TextField from "@mui/material/TextField";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
interface Props {
  label: string;
  value: string;
  onChange: (data?: any) => void;
  helperText?: string | false | undefined;
}
export const PasswordInput = ({
  label,
  value,
  onChange,
  helperText,
}: Props) => {
  const [show, setShow] = useState("password");

  return (
    <TextField
      autoComplete="off"
      size="small"
      fullWidth
      type={show}
      label={label}
      value={value || ""}
      onChange={(e) => {
        onChange(e.target.value);
      }}
      error={helperText ? true : false}
      helperText={helperText}
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
