import * as Yup from "yup";
import { useFormik } from "formik";
import { TextInput } from "../form/TextInput";
import { Profile } from "@/type/auth";
import { ImageInput } from "../form/ImageInput";
import { useAppDispatch } from "@/store/hooks";
import { editProfile, getProfile } from "@/store/slice/authSlice";
import toast from "react-hot-toast";
interface Props {
  data: Profile;
}
export const ProfileEdit = ({ data }: Props) => {
  const dispatch = useAppDispatch();
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Username is required."),
    email: Yup.string().email().required("Email is required"),
  });

  const formik = useFormik({
    initialValues: data,
    validationSchema,
    onSubmit: (value) => {
      dispatch(
        editProfile({
          ...value,
          onSuccess: () => {
            toast.success("Your profile is Updated.");
            dispatch(getProfile());
          },
        })
      );
      console.log(value);
    },
  });
  return (
    <form onSubmit={formik.handleSubmit} className="max-w-screen-sm">
      <h3 className="text-xl font-semibold mt-4 text-green border-s-4 px-2 border-green">
        Edit Profile
      </h3>
      <div className="w-full mt-5 ">
        <TextInput
          value={formik.values.name}
          type="text"
          label="Name"
          onChange={(e) => formik.setFieldValue("name", e)}
          helperText={formik.touched.name && (formik.errors.name as string)}
        />
      </div>
      <div className="w-full mt-5 ">
        <TextInput
          type="text"
          value={formik.values.email}
          label="Email"
          onChange={(e) => formik.setFieldValue("email", e)}
          helperText={formik.touched.email && (formik.errors.email as string)}
          disable={true}
        />
      </div>
      <div className="w-full mt-5 ">
        <TextInput
          type="text"
          value={formik.values.phone as string}
          label="Phone"
          onChange={(e) => formik.setFieldValue("phone", e)}
        />
      </div>
      <div className="mt-5">
        <ImageInput
          value={formik.values.assetUrl}
          onChange={(e) => {
            formik.setFieldValue("assetUrl", e);
          }}
        />
      </div>

      <div className=" mt-3 relative">
        <button
          type="submit"
          className="login-btn text-center z-1 px-10 cursor-pointer"
        >
          Save Change
        </button>
      </div>
    </form>
  );
};
