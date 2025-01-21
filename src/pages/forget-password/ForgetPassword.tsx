import { TextField } from "@mui/material";
import { Title } from "@/component/layout/Title";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";
import { getAppSetting } from "@/store/slice/appSlice";

export const ForgetPassword = () => {
  const dispatch = useAppDispatch();
  const { setting } = useAppSelector((store) => store.app);
  useEffect(() => {
    dispatch(getAppSetting());
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
        <div className="bg-white w-full md:w-[500px] rounded-xl p-3 md:p-5 py-8 mt-3 ">
          <h3 className="text-xl font-semibold mt-4 text-green border-s-4 px-2 border-green">
            Forget Password
          </h3>
          <div className="w-full mt-5 ">
            <TextField
              autoComplete="off"
              size="small"
              fullWidth
              required
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
            />
            <div className="flex-1 mt-5 sm:mt-0 border border-green border-dashed text-graydark  py-2 rounded-md ">
              <p className="tracking-[2rem] text-center">3455</p>
            </div>
          </div>
          <div className="flex justify-center mt-3 relative">
            <button className="login-btn z-1 w-full" style={{}}>
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
