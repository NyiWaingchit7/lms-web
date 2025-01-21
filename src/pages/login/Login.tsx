import { TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { Title } from "@/component/layout/Title";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";
import { getAppSetting } from "@/store/slice/appSlice";

export const Login = () => {
  const dispatch = useAppDispatch();
  const { setting } = useAppSelector((store) => store.app);
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
        <div className="bg-white w-full md:w-[500px] rounded-xl p-3 md:p-5 py-8 mt-3 ">
          <h3 className="text-xl font-semibold mt-4 text-green border-s-4 px-2 border-green">
            Login
          </h3>
          <div className="w-full mt-5 ">
            <TextField
              autoComplete="off"
              size="small"
              fullWidth
              required
              label="Email"
            />
          </div>
          <div className="w-full mt-5">
            <TextField
              autoComplete="off"
              size="small"
              fullWidth
              required
              label="Password"
            />
          </div>
          <Link to="/" className="mt-5">
            <p className="text-end underline text-green "> Forget password</p>
          </Link>
          <div className="flex justify-center mt-3 relative">
            <button className="login-btn z-1 w-full" style={{}}>
              Log in
            </button>
          </div>
          <div className="mt-5">
            <p className="text-graydark">
              Don't have an account?{" "}
              <Link to={"/register"} className="underline text-green ">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
