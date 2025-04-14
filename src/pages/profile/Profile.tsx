import { Layout } from "@/component/layout/Layout";
import { Title } from "@/component/layout/Title";

import { useEffect, useState } from "react";
import { ChangePassword } from "@/component/profile/ChangePassword";
import { ProfileDetail } from "@/component/profile/ProfileDetail";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { myProfile } from "@/store/slice/authSlice";
import { Profile } from "@/type/auth";
import { MyCourses } from "@/component/profile/MyCourses";
import { Course } from "@/type/course";
export const AccountProfile = () => {
  const { profile } = useAppSelector((store) => store.auth);
  const [active, setActive] = useState(1);
  const dispatch = useAppDispatch();

  const menus = [
    {
      id: 1,
      label: "Profile",
      content: <ProfileDetail data={profile as Profile} />,
      icon: "fa-user",
    },
    {
      id: 2,
      label: "My Courses",
      content: <MyCourses lectures={profile?.lectures as Course[]} />,
      icon: "fa-graduation-cap",
    },
    {
      id: 3,
      label: "Change Password",
      content: <ChangePassword />,
      icon: "fa-key",
    },
    {
      id: 4,
      label: "Log Out",
      icon: "fa-right-from-bracket",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.history.back();
  };
  useEffect(() => {
    dispatch(myProfile());
  }, []);

  return (
    <Layout>
      <Title title="Profile" />
      <div className="container">
        <div className="py-5 rounded-lg">
          <div className="flex gap-5 mb-5">
            {menus.map((menu, idx) => (
              <button
                className={`px-5 py-2 border  rounded-md last:bg-red last:text-white flex gap-2 items-center ${
                  active === menu.id
                    ? "text-green border-green"
                    : "border-slate-300"
                }`}
                onClick={() => {
                  idx === menus.length - 1
                    ? handleLogout()
                    : setActive(menu.id);
                }}
                key={menu.id}
              >
                {menu.label}

                <i className={`fa-solid ${menu.icon} text-xs`}></i>
              </button>
            ))}
          </div>
          {menus.map((item) => active === item.id && item.content)}
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
