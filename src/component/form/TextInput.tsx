import TextField from "@mui/material/TextField";

interface Props {
  label: string;
  value: string;
  onChange: (data?: any) => void;
  type: string;
}
export const TextInput = ({ label, value, onChange, type }: Props) => {
  return (
    <TextField
      autoComplete="off"
      size="small"
      fullWidth
      required
      type={type}
      label={label}
      value={value || ""}
      onChange={(e) => {
        onChange(e.target.value);
      }}
    />
  );
};
