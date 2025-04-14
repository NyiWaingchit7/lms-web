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
import * as Yup from "yup";
import { useFormik } from "formik";
import { AuthLayout } from "@/component/layout/AuthLayout";
export const Register = () => {
  const dispatch = useAppDispatch();
  const { setting } = useAppSelector((store) => store.app);
  const [code, setCode] = useState("");
  const [isOtp, setIsOtp] = useState(false);
  const defaultForm = {
    name: "",
    email: "",
    phone: "",
    password: "",
  };
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const navigate = useNavigate();

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
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Username is required."),
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
        accountRegister({
          ...value,
          onSuccess: (message: any) => {
            toast.success(message);
            setIsOtp(true);
            setForm(value);
          },
        })
      );
    },
  });

  useEffect(() => {
    dispatch(getAppSetting());
  }, []);
  return (
    <AuthLayout title="Register">
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
          <form onSubmit={formik.handleSubmit}>
            <h3 className="text-xl font-semibold mt-4 text-green border-s-4 px-2 border-green">
              Register
            </h3>
            <div className="w-full mt-5 ">
              <TextInput
                value={formik.values.name}
                type="text"
                label="Name"
                onChange={(e) => formik.setFieldValue("name", e)}
                helperText={
                  formik.touched.name && (formik.errors.name as string)
                }
              />
            </div>
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
            <div className="w-full mt-5 ">
              <TextInput
                type="text"
                value={formik.values.phone}
                label="Phone"
                onChange={(e) => formik.setFieldValue("phone", e)}
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

            <div className="flex justify-center mt-3 relative">
              <button
                type="submit"
                className="login-btn text-center z-1 w-full cursor-pointer"
              >
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
    </AuthLayout>
  );
};
