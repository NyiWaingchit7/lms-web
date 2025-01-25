import { Link, useNavigate } from "react-router-dom";
import { Title } from "@/component/layout/Title";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect, useState } from "react";
import { getAppSetting } from "@/store/slice/appSlice";
import { PasswordInput } from "@/component/form/PasswordInput";
import { TextInput } from "@/component/form/TextInput";
import { accountLogin } from "@/store/slice/authSlice";
export const Login = () => {
  const dispatch = useAppDispatch();
  const { setting } = useAppSelector((store) => store.app);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const handleLogin = (e: any) => {
    e.preventDefault();
    dispatch(
      accountLogin({
        ...form,
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
      <Title title="Log in" />

      <div className="w-full mx-3 flex  flex-col justify-center items-center ">
        <div className="flex justify-center items-end gap-2">
          <img src="/logo.png" className="w-20" alt="" />
          <h3 className="text-4xl md:text-5xl text-white font-semibold">
            {setting?.app_name || " Akone Learn"}
          </h3>
        </div>
        <form
          onSubmit={handleLogin}
          className="bg-white w-full md:w-[500px] rounded-xl p-3 md:p-5 py-8 mt-3 "
        >
          <h3 className="text-xl font-semibold mt-4 text-green border-s-4 px-2 border-green">
            Login
          </h3>
          <div className="w-full mt-5 ">
            <TextInput
              type="text"
              value={form.email}
              label="Email"
              onChange={(e) => {
                setForm({ ...form, email: e });
              }}
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
          <Link to="/forget-password" className="mt-5">
            <p className="text-end underline text-green "> Forget password</p>
          </Link>
          <div className="flex justify-center mt-3 relative">
            <button className="login-btn z-1 w-full">Log in</button>
          </div>
          <div className="mt-5">
            <p className="text-graydark">
              Don't have an account?{" "}
              <Link to={"/register"} className="underline text-green ">
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
