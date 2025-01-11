import { Link, useLocation } from "react-router-dom";
import { Layout } from "../layout/Layout";
import { Title } from "../layout/Title";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
export const NotFound = () => {
  const path = useLocation();
  return (
    <Layout>
      <Title title="404" />
      <div className="h-[60vh] flex justify-center items-center">
        <div className="text-center flex flex-col justify-center items-center gap-5">
          <h3 className="text-8xl not-found cherry-bomb-one-regular"> 404 </h3>
          <Link
            to={"/"}
            className="login-btn w-30 font-medium !text-green hover:!text-white text-lg"
          >
            <KeyboardBackspaceIcon /> Home
          </Link>
          <p className="text-lg text-slate-500">
            Page not found : {path.pathname}{" "}
          </p>
        </div>
      </div>
    </Layout>
  );
};
