import TextField from "@mui/material/TextField";

interface Props {
  label: string;
  value: string;
  onChange: (data?: any) => void;
  type: string;
  helperText?: string | false | undefined;
  disable?: boolean;
}
export const TextInput = ({
  label,
  value,
  onChange,
  type,
  helperText,
  disable = false,
}: Props) => {
  return (
    <TextField
      autoComplete="off"
      size="small"
      fullWidth
      type={type}
      label={label}
      value={value || ""}
      onChange={(e) => {
        onChange(e.target.value);
      }}
      error={helperText ? true : false}
      helperText={helperText}
      disabled={disable}
    />
  );
};
