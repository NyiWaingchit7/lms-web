import { Link } from "react-router-dom";
import { Layout } from "../layout/Layout";
import { Title } from "../layout/Title";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
export const ErrorPage = () => {
  return (
    <Layout>
      <Title title="500" />
      <div className="my-30 flex justify-center items-center ">
        <div className="text-center flex flex-col justify-center items-center gap-5">
          <h3 className="text-9xl not-found cherry-bomb-one-regular"> 500 </h3>
          <Link
            to={"/"}
            className="login-btn w-30 font-medium !text-green hover:!text-white text-lg"
          >
            <KeyboardBackspaceIcon /> Home
          </Link>
          <p className="text-lg text-slate-500">
            Oops! Something went wrong on our end. Please refresh the page or
            try again later.
          </p>
        </div>
      </div>
    </Layout>
  );
};
