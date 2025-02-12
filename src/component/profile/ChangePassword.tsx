import { PasswordInput } from "@/component/form/PasswordInput";
import { useState } from "react";

export const ChangePassword = () => {
  const [form, setForm] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "",
  });
  const handleChangePassword = (e: any) => {
    e.preventDefault();
  };
  return (
    <div className="">
      <form
        onSubmit={handleChangePassword}
        className="bg-white w-full md:w-[500px] rounded-xl  "
      >
        <h3 className="text-xl font-semibold mt-4 text-green border-s-4 px-2 border-green">
          Change Password
        </h3>

        <div className="w-full mt-5">
          <PasswordInput
            label="Old Password"
            value={form.old_password}
            onChange={(e) => {
              setForm({ ...form, old_password: e });
            }}
          />
        </div>
        <div className="w-full mt-5">
          <PasswordInput
            label="New Password"
            value={form.new_password}
            onChange={(e) => {
              setForm({ ...form, new_password: e });
            }}
          />
        </div>
        <div className="w-full mt-5">
          <PasswordInput
            label="Confirm Password"
            value={form.confirm_password}
            onChange={(e) => {
              setForm({ ...form, confirm_password: e });
            }}
          />
        </div>

        <div className="flex justify-center mt-3 relative">
          <button className="login-btn z-1 w-full">Change</button>
        </div>
      </form>
    </div>
  );
};
