import { TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { Title } from "../../component/layout/Title";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useEffect } from "react";
import { getAppSetting } from "../../store/slice/appSlice";

export const Register = () => {
  const dispatch = useAppDispatch();
  const { setting } = useAppSelector((store) => store.app);
  useEffect(() => {
    dispatch(getAppSetting());
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
        <div className="bg-white w-full md:w-[500px] rounded-xl p-3 md:p-5 py-8 mt-3 ">
          <h3 className="text-xl font-semibold mt-4 text-green">Register</h3>
          <div className="w-full mt-5 ">
            <TextField
              autoComplete="off"
              size="small"
              fullWidth
              required
              label="Name"
            />
          </div>
          <div className="w-full mt-5 ">
            <TextField
              autoComplete="off"
              size="small"
              fullWidth
              required
              label="Email"
            />
          </div>
          <div className="w-full mt-5 ">
            <TextField
              autoComplete="off"
              size="small"
              fullWidth
              required
              label="Phone"
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

          <div className="flex justify-center mt-3 relative">
            <button className="login-btn z-1 w-full" style={{}}>
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
        </div>
      </div>
    </div>
  );
};
