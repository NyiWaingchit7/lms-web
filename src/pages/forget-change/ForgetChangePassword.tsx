import { PasswordInput } from "@/component/form/PasswordInput";
import { Title } from "@/component/layout/Title";
import { useState } from "react";

export const ForgetChangePassword = () => {
  const [form, setForm] = useState({
    new_password: "",
    confirm_password: "",
  });
  const handleChangePassword = (e: any) => {
    e.preventDefault();
    console.log(form);
  };
  return (
    <div className="bg-green min-h-screen flex  justify-center items-center ">
      <Title title="Change Passowrd" />
      <div className="mt-10 mx-3 flex  flex-col justify-center items-center">
        <form
          onSubmit={handleChangePassword}
          className="bg-white w-full md:w-[500px] rounded-xl p-3 md:p-5 py-8 mt-3 "
        >
          <h3 className="text-xl font-semibold mt-4 text-green border-s-4 px-2 border-green">
            Create New Password
          </h3>
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
            <button className="login-btn z-1 w-full">Confirm</button>
          </div>
        </form>
      </div>
    </div>
  );
};
