import { Layout } from "@/component/layout/Layout";
import { Title } from "@/component/layout/Title";
import { TextField } from "@mui/material";
import { useLocation } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
export const Checkout = () => {
  const location = useLocation();
  const { data } = location.state || {};
  return (
    <Layout>
      <Title title="Checkout" />
      <div className="container">
        <div className="relative flex max-w-screen-md mx-auto mt-5 p-5 rounded-md ">
          {data ? (
            <div className="curve-card p-5">
              <h3 className="text-xl font-semibold text-green border-s-4 px-2 border-green">
                Checkout
              </h3>
              <div className="md:flex gap-5 mt-5">
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
              <div className="mt-5">
                <label htmlFor="payment">Choose Payment screenshoot</label>
                <TextField id="payment" fullWidth type="file" />
              </div>
              <div className="mt-5">
                <small className=" text-center d-block">
                  After review your screenshot, I will email you if your payment
                  is success or not. You will see your course under the my
                  courses.
                </small>
              </div>
              <div className="mt-5 flex justify-center">
                <button className="login-btn z-1 w-full" style={{}}>
                  Confirm
                </button>
              </div>
            </div>
          ) : (
            <div className=" h-[300px] flex  justify-center items-center">
              <p>There is no course choosen.</p>
            </div>
          )}
          <div className="checkout-icon cursor-pointer w-[50px] h-[50px] right-5 absolute flex justify-center items-center rounded-full bg-green">
            <ShoppingCartIcon
              className="text-white "
              sx={{ fontSize: "1.5rem" }}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};
