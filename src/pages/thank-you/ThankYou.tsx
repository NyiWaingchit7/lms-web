import { Layout } from "@/component/layout/Layout";
import { Link, useLocation } from "react-router-dom";

export const ThankYou = () => {
  const location = useLocation();
  const { data } = location.state || {};
  return (
    <Layout>
      <div className="container min-h-[60vh] flex flex-col  items-center gap-5 mt-10">
        <div className="flex justify-center items-end gap-2">
          <i className="fa-solid fa-circle-check text-5xl text-green"></i>
        </div>
        <h1 className="cherry-bomb-one-regular text-5xl text-green">
          Thank You
        </h1>
        <p className="text-slate-600">We will sent email about purchasement.</p>

        <div className="md:flex gap-5 mt-5 bg-black/5 pr-5">
          <img
            src={data?.assetUrl || ""}
            className="h-[150px] max-[300px] object-cover rounded-lg"
            alt=""
          />

          <div className="flex flex-col justify-center mt-3 md:mt-0">
            <h3 className="font-medium">Course : {data?.title}</h3>
            <h3 className="font-medium">
              Price : {data?.discount_price || data?.price}MMK
            </h3>
          </div>
        </div>
        <Link
          to={"/"}
          className="login-btn  font-medium !text-green hover:!text-white text-lg"
        >
          <i className="fa-solid fa-arrow-left pe-3"></i>Back To Home
        </Link>
        <small className="text-slate-500">
          If you have any issue. <strong>Contac Us</strong>
        </small>
      </div>
    </Layout>
  );
};
