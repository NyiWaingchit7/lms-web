import { Link, useNavigate } from "react-router-dom";
import { Title } from "@/component/layout/Title";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";
import { getAppSetting } from "@/store/slice/appSlice";
import { PasswordInput } from "@/component/form/PasswordInput";
import { TextInput } from "@/component/form/TextInput";
import { accountLogin } from "@/store/slice/authSlice";
import { GoogleLogin } from "@/component/auth/GoogleLogin";
import * as Yup from "yup";
import { useFormik } from "formik";
export const Login = () => {
  const dispatch = useAppDispatch();
  const { setting } = useAppSelector((store) => store.app);
  const navigate = useNavigate();
  const defaultForm = {
    name: "",
    email: "",
    phone: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 letters.")
      .required("Password is required."),
  });

  const formik = useFormik({
    initialValues: defaultForm,
    validationSchema,
    onSubmit: (value) => {
      dispatch(
        accountLogin({
          ...value,
          onSuccess: () => {
            navigate("/");
          },
        })
      );
    },
  });
  useEffect(() => {
    dispatch(getAppSetting());
  }, []);
  return (
    <div className="bg-green min-h-screen flex  justify-center items-center ">
      <Title title="Log in" />

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
        <form
          onSubmit={formik.handleSubmit}
          className="bg-white w-full md:w-[500px] rounded-xl p-3 md:p-5 py-8 mt-3 "
        >
          <h3 className="text-xl font-semibold mt-4 text-green border-s-4 px-2 border-green">
            Login
          </h3>
          <div className="w-full mt-5 ">
            <TextInput
              type="text"
              value={formik.values.email}
              label="Email"
              onChange={(e) => formik.setFieldValue("email", e)}
              helperText={
                formik.touched.email && (formik.errors.email as string)
              }
            />
          </div>
          <div className="w-full mt-5">
            <PasswordInput
              label="Password"
              value={formik.values.password}
              onChange={(e) => formik.setFieldValue("password", e)}
              helperText={
                formik.touched.password && (formik.errors.password as string)
              }
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
          <div className="mt-5">
            <GoogleLogin title="Log in" />
          </div>
        </form>
      </div>
    </div>
  );
};
