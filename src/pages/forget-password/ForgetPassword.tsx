import { Title } from "@/component/layout/Title";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect, useState } from "react";
import { getAppSetting } from "@/store/slice/appSlice";
import { TextInput } from "@/component/form/TextInput";
import { forgetPassword, forgetVerify } from "@/store/slice/authSlice";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { MuiOtpInput } from "mui-one-time-password-input";
import { AuthLayout } from "@/component/layout/AuthLayout";

export const ForgetPassword = () => {
  const dispatch = useAppDispatch();
  const { setting } = useAppSelector((store) => store.app);
  const navigate = useNavigate();
  const [isOtp, setIsOtp] = useState(false);

  const [form, setForm] = useState({
    email: "",
  });
  const [code, setCode] = useState("");
  const handleForget = (e: any) => {
    e.preventDefault();
    if (!form.email) {
      toast.error("Enter Your Email.");
      return;
    }
    dispatch(
      forgetPassword({
        ...form,
        onSuccess: () => {
          toast.success("Enter the otp code we have sent.");
          setIsOtp(true);
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
  }, []);
  return (
    <AuthLayout title="ForgetPassword">
      <div className="bg-white w-full md:w-[500px] rounded-xl p-3 md:p-5 py-8 mt-3 ">
        {isOtp ? (
          <form onSubmit={handleVerify}>
            <h3 className="text-xl font-semibold mt-4 text-green border-s-4 px-2 border-green">
              Verify Otp
            </h3>
            <div className="w-full mt-5  items-center gap-3">
              <div className="my-5">
                <p>
                  Please enter 6 digit code sent to{" "}
                  <span className="text-green"> {form.email} </span>
                </p>
              </div>

              <div className="my-5">
                <MuiOtpInput
                  sx={{
                    marginTop: 1,
                  }}
                  className="w-[370px] mx-auto"
                  length={6}
                  value={code}
                  onChange={(newValue) => {
                    setCode(newValue);
                  }}
                />
              </div>
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
    </AuthLayout>
  );
};
