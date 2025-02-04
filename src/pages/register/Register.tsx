import { Link, useNavigate } from "react-router-dom";
import { Title } from "@/component/layout/Title";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect, useState } from "react";
import { getAppSetting } from "@/store/slice/appSlice";
import { MuiOtpInput } from "mui-one-time-password-input";
import { PasswordInput } from "@/component/form/PasswordInput";
import { TextInput } from "@/component/form/TextInput";
import { accountRegister, registerVerify } from "@/store/slice/authSlice";
import toast from "react-hot-toast";
import { GoogleLogin } from "@/component/auth/GoogleLogin";
export const Register = () => {
  const dispatch = useAppDispatch();
  const { setting } = useAppSelector((store) => store.app);
  const [code, setCode] = useState("");
  const [isOtp, setIsOtp] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleRegister = (e: any) => {
    e.preventDefault();
    dispatch(
      accountRegister({
        ...form,
        onSuccess: (message: any) => {
          toast.success(message);
          setIsOtp(true);
        },
      })
    );
    console.log(form);
  };
  const handleVeifty = (e: any) => {
    e.preventDefault();

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
  }, []);
  return (
    <div className="bg-green min-h-screen flex  justify-center items-center ">
      <Title title="Register" />
      <div className="w-full mx-3 flex  flex-col justify-center items-center ">
        <div className="flex justify-center items-end gap-2">
          <Link to={"/"}>
            {" "}
            <img src="/logo.png" className="w-20" alt="" />
          </Link>
          <h3 className="text-4xl md:text-5xl text-white font-semibold">
            {setting?.app_name || "Akone Learn"}
          </h3>
        </div>
        <div className="bg-white w-full md:w-[500px] rounded-xl p-3 md:p-5 py-8 mt-3 ">
          {isOtp ? (
            <form onSubmit={handleVeifty}>
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
                    className="md:w-[370px] mx-auto"
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
            <form onSubmit={handleRegister}>
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

              <div className="flex justify-center mt-3 relative">
                <button className="login-btn text-center z-1 w-full cursor-pointer">
                  Register
                </button>
              </div>
              <div className="mt-5">
                <p className="text-graydark">
                  Already have an account?
                  <Link to={"/log-in"} className="underline text-green ">
                    Log in
                  </Link>
                </p>
              </div>
              <div className="mt-5">
                <GoogleLogin title="Register" />
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
