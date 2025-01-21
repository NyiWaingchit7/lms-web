import { Layout } from "@/component/layout/Layout";
import { Title } from "@/component/layout/Title";
import { TextField } from "@mui/material";

export const ChangePassword = () => {
  return (
    <Layout>
      <Title title="Change Passowrd" />
      <div className="mt-10 mx-3 flex  flex-col justify-center items-center">
        {/* <div className="flex justify-center items-end gap-2">
          <img src="/logo.png" className="w-20" alt="" />
          <h3 className="text-4xl md:text-5xl text-white font-semibold">
            {setting?.app_name || " Akone Learn"}
          </h3>
        </div> */}
        <div className="bg-white w-full md:w-[500px] rounded-xl p-3 md:p-5 py-8 mt-3 ">
          <h3 className="text-xl font-semibold mt-4 text-green border-s-4 px-2 border-green">
            Change Password
          </h3>

          <div className="w-full mt-5">
            <TextField
              autoComplete="off"
              size="small"
              fullWidth
              required
              label="Old Password"
            />
          </div>
          <div className="w-full mt-5">
            <TextField
              autoComplete="off"
              size="small"
              fullWidth
              required
              label="New Password"
            />
          </div>
          <div className="w-full mt-5">
            <TextField
              autoComplete="off"
              size="small"
              fullWidth
              required
              label="Confirm Password"
            />
          </div>

          <div className="flex justify-center mt-3 relative">
            <button className="login-btn z-1 w-full" style={{}}>
              Change
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};
