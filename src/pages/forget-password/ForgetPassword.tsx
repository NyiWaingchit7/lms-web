import { TextField } from "@mui/material";
import { Title } from "@/component/layout/Title";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect, useState } from "react";
import { getAppSetting } from "@/store/slice/appSlice";
import { TextInput } from "@/component/form/TextInput";
import { forgetPassword, forgetVerify, setOTP } from "@/store/slice/authSlice";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

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
      dispatch(setOTP(null));
    };
  }, []);
  return (
    <div className="bg-green min-h-screen flex  justify-center items-center ">
      <Title title="Forget Password" />

      <div className="w-full mx-3 flex  flex-col justify-center items-center ">
        <div className="flex justify-center items-end gap-2">
          <Link to={"/"}>
            {" "}
            <img src="/logo.png" className="w-20" alt="" />
          </Link>
          <h3 className="text-4xl md:text-5xl text-white font-semibold">
            {setting?.app_name || " Akone Learn"}
          </h3>
        </div>
        <div className="bg-white w-full md:w-[500px] rounded-xl p-3 md:p-5 py-8 mt-3 ">
          {otp_code ? (
            <form onSubmit={handleVerify}>
              <h3 className="text-xl font-semibold mt-4 text-green border-s-4 px-2 border-green">
                Verify Otp
              </h3>
              <div className="w-full mt-5  items-center gap-3">
                <div className="flex-1 mb-5 flex justify-center sm:mt-0 border border-green  text-graydark  py-2 rounded-md px-3 items-center ">
                  <p className="tracking-[10px] h-[20px] text-center text-xl">
                    {otp_code || "32235"}
                  </p>{" "}
                </div>
                <TextField
                  autoComplete="off"
                  size="small"
                  fullWidth
                  label="Enter Your Otp code"
                  className="flex-1"
                  onChange={(e) => setCode(e.target.value)}
                />
              </div>
              <button className="login-btn text-center z-1 w-full cursor-pointer mt-5">
                Verify
              </button>
            </form>
          ) : (
            <form onSubmit={handleForget}>
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

              <div className="flex justify-center mt-5 relative">
                <button className="login-btn z-1 w-full text-center">
                  Get Code
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
