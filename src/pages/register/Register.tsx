import { TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Title } from "@/component/layout/Title";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect, useState } from "react";
import { getAppSetting } from "@/store/slice/appSlice";

import { PasswordInput } from "@/component/form/PasswordInput";
import { TextInput } from "@/component/form/TextInput";
import {
  accountRegister,
  registerVerify,
  setOTP,
} from "@/store/slice/authSlice";
import toast from "react-hot-toast";
export const Register = () => {
  const dispatch = useAppDispatch();
  const { setting } = useAppSelector((store) => store.app);
  const { otp_code } = useAppSelector((store) => store.auth);
  const [code, setCode] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleRegister = (e: any) => {
    e.preventDefault();
    dispatch(accountRegister({ ...form }));
    console.log(form);
  };
  const handleVeifty = (e: any) => {
    e.preventDefault();

    if (!code) {
      toast.error("Please enter otp code.");
      return;
    }
    dispatch(
      registerVerify({
        ...form,
        code: Number(code),
        onSuccess: () => {
          navigate("/");
        },
      })
    );
  };
  useEffect(() => {
    dispatch(getAppSetting());
    return () => {
      setOTP(null);
    };
  }, []);
  return (
    <div className="bg-green min-h-screen flex  justify-center items-center ">
      <Title title="Register" />
      <div className="w-full mx-3 flex  flex-col justify-center items-center ">
        <div className="flex justify-center items-end gap-2">
          <img src="/logo.png" className="w-20" alt="" />
          <h3 className="text-4xl md:text-5xl text-white font-semibold">
            {setting?.app_name || "Akone Learn"}
          </h3>
        </div>
        <form
          onSubmit={handleRegister}
          className="bg-white w-full md:w-[500px] rounded-xl p-3 md:p-5 py-8 mt-3 "
        >
          <h3 className="text-xl font-semibold mt-4 text-green border-s-4 px-2 border-green">
            Register
          </h3>
          <div className="w-full mt-5 ">
            <TextInput
              value={form.name}
              type="text"
              label="Name"
              onChange={(e) => setForm({ ...form, name: e })}
            />
          </div>
          <div className="w-full mt-5 ">
            <TextInput
              type="text"
              value={form.email}
              label="Email"
              onChange={(e) => setForm({ ...form, email: e })}
            />
          </div>
          <div className="w-full mt-5 ">
            <TextInput
              type="text"
              value={form.phone}
              label="Phone"
              onChange={(e) => setForm({ ...form, phone: e })}
            />
          </div>
          <div className="w-full mt-5">
            <PasswordInput
              label="Password"
              value={form.password}
              onChange={(e) => {
                setForm({ ...form, password: e });
              }}
            />
          </div>
          <div className="w-full mt-5 sm:flex  items-center gap-3">
            <TextField
              autoComplete="off"
              size="small"
              fullWidth
              label="Enter Your Otp code"
              className="flex-1"
              onChange={(e) => setCode(e.target.value)}
            />
            <div className="flex-1 mt-5 sm:mt-0 border border-green border-dashed text-graydark  py-2 rounded-md flex justify-between px-3 items-center ">
              <p className="tracking-[10px] text-center">{otp_code}</p>{" "}
              <button className="text-green cursor-pointer font-medium hover:underline">
                Get
              </button>
            </div>
          </div>
          <div className="flex justify-center mt-3 relative">
            <div
              className="login-btn text-center z-1 w-full cursor-pointer"
              onClick={handleVeifty}
            >
              Register
            </div>
          </div>
          <div className="mt-5">
            <p className="text-graydark">
              Already have an account?
              <Link to={"/log-in"} className="underline text-green ">
                Log in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
