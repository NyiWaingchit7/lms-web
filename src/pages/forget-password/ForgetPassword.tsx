import { TextField } from "@mui/material";
import { Title } from "@/component/layout/Title";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect, useState } from "react";
import { getAppSetting } from "@/store/slice/appSlice";
import { TextInput } from "@/component/form/TextInput";
import { forgetPassword, forgetVerify, setOTP } from "@/store/slice/authSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const ForgetPassword = () => {
  const dispatch = useAppDispatch();
  const { setting } = useAppSelector((store) => store.app);
  const { otp_code } = useAppSelector((store) => store.auth);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
  });
  const [code, setCode] = useState("");
  const handleForget = (e: any) => {
    e.preventDefault();
    dispatch(
      forgetPassword({
        ...form,
        onSuccess: () => {
          toast.success("Enter the otp code we have sent.");
        },
      })
    );
  };
  const handleVerify = (e: any) => {
    e.preventDefault();
    if (!code) {
      toast.error("Please enter otp code.");
      return;
    }
    dispatch(
      forgetVerify({
        ...form,
        code: Number(code),
        onSuccess: () => {
          navigate("/forget-password-change", {
            state: { email: form.email },
          });
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
      <Title title="Forget Password" />

      <div className="w-full mx-3 flex  flex-col justify-center items-center ">
        <div className="flex justify-center items-end gap-2">
          <img src="/logo.png" className="w-20" alt="" />
          <h3 className="text-4xl md:text-5xl text-white font-semibold">
            {setting?.app_name || " Akone Learn"}
          </h3>
        </div>
        <form className="bg-white w-full md:w-[500px] rounded-xl p-3 md:p-5 py-8 mt-3 ">
          <h3 className="text-xl font-semibold mt-4 text-green border-s-4 px-2 border-green">
            Forget Password
          </h3>
          <div className="w-full mt-5 ">
            <TextInput
              value={form.email}
              onChange={(e) => {
                setForm({ ...form, email: e });
              }}
              type="text"
              label="Enter your email"
            />
          </div>
          <div className="w-full mt-5 sm:flex  items-center gap-3">
            <TextField
              autoComplete="off"
              size="small"
              fullWidth
              required
              label="Enter Your Otp code"
              className="flex-1"
              onChange={(e) => setCode(e.target.value)}
            />
            <div className="flex-1 mt-5 sm:mt-0 border border-green border-dashed text-graydark  py-2 rounded-md flex justify-between px-3 items-center ">
              <p className="tracking-[10px] text-center">{otp_code}</p>{" "}
              <button
                onClick={handleForget}
                className="text-green cursor-pointer font-medium hover:underline"
              >
                Get
              </button>
            </div>
          </div>
          <div className="flex justify-center mt-5 relative">
            <div
              className="login-btn z-1 w-full text-center"
              onClick={handleVerify}
            >
              Confirm
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
