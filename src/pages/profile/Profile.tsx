import { Layout } from "@/component/layout/Layout";
import { Title } from "@/component/layout/Title";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { ChangePassword } from "@/component/profile/ChangePassword";
import { ProfileDetail } from "@/component/profile/ProfileDetail";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { myProfile } from "@/store/slice/authSlice";
import { Profile } from "@/type/auth";
export const AccountProfile = () => {
  // const navigate = useNavigate();
  const [value, setValue] = useState("1");
  const { profile } = useAppSelector((store) => store.auth);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(myProfile());
  }, []);
  return (
    <Layout>
      <Title title="Profile" />
      <div className="container">
        <div className="py-5 border border-black !border-opacity-10 rounded-lg">
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={(_, newValue) => {
                  setValue(newValue);
                }}
                aria-label="lab API tabs example"
                variant="scrollable"
              >
                <Tab className="tab-text" label="Profile" value="1" />
                <Tab
                  className="tab-text"
                  label={`My Courses (${profile?.lectures?.length || "0"})`}
                  value="2"
                />
                <Tab className="tab-text" label="Change Password" value="3" />
                {/* <button
                  className="text-red"
                  onClick={() => {
                    localStorage.removeItem("token");
                    navigate("/");
                  }}
                >
                  Log out
                </button> */}
              </TabList>
            </Box>
            <TabPanel value="1" keepMounted>
              <ProfileDetail data={profile as Profile} />
            </TabPanel>
            <TabPanel value="2">
              {profile?.lectures?.length ? (
                profile.lectures?.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-10 p-3 border border-black !border-opacity-10  transition-all duration-300 ease-in-out max-w-screen-sm rounded-xl"
                  >
                    <div className="flex items-center gap-5 md:gap-10">
                      <img
                        src={item.assetUrl}
                        alt={item.title}
                        className="w-20 rounded-xl"
                      />
                      <h5 className="text-xs md:text-sm">{item.title}</h5>
                    </div>
                    <div>
                      <button className="login-btn rounded-xl text-xs hidden md:block">
                        Watch
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="w-full h-[300px] flex justify-center items-center bg-black/5">
                  <p className="text-body">There is no courses yet</p>
                </div>
              )}
            </TabPanel>
            <TabPanel value="3">
              <ChangePassword />
            </TabPanel>
          </TabContext>
        </div>
        {/* <button
          className="no-btn"
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/");
          }}
        >
          Log out
        </button> */}
      </div>
    </Layout>
  );
};
