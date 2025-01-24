import { Layout } from "@/component/layout/Layout";
import { Title } from "@/component/layout/Title";
import { TextField, Tooltip } from "@mui/material";
import { useLocation } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect, useState } from "react";
import { courseDetail, setCourseDetail } from "@/store/slice/courseSlice";
import SchoolIcon from "@mui/icons-material/School";
import { Course } from "@/type/course";
export const Checkout = () => {
  const location = useLocation();
  const { data } = location.state || {};
  const dispatch = useAppDispatch();
  const course = useAppSelector((store) => store.courses.detail) as Course;
  const [isCheckout, setCheckout] = useState(true);
  useEffect(() => {
    if (data) {
      dispatch(courseDetail({ id: Number(data.id) }));
    }
    return () => {
      dispatch(setCourseDetail(null));
    };
  }, []);
  return (
    <Layout>
      <Title title="Checkout" />
      <div className="container">
        <div className="relative flex max-w-screen-md mx-auto p-5 rounded-md ">
          {data ? (
            <div className="curve-card p-5 w-full">
              {isCheckout ? (
                <div>
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
                      After review your screenshot, I will email you if your
                      payment is success or not. You will see your course under
                      the my courses.
                    </small>
                  </div>
                  <div className="mt-5 flex justify-center">
                    <button className="login-btn z-1 w-full" style={{}}>
                      Confirm
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <h3 className="text-xl font-semibold text-green border-s-4 px-2 border-green">
                    Course Outlines
                  </h3>
                  <div className="mt-5">
                    {course?.Lesson.map((data, i) => (
                      <h3 key={data?.id} className="font-medium">
                        {i + 1} - {data?.title}
                      </h3>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className=" h-[300px] flex  justify-center items-center">
              <p>There is no course choosen.</p>
            </div>
          )}
          <Tooltip
            title={isCheckout ? "See course outlines" : "Back to checkout"}
            placement="right"
          >
            <div
              onClick={() => {
                setCheckout(!isCheckout);
              }}
              className="checkout-icon cursor-pointer w-[50px] h-[50px] right-13 absolute flex justify-center items-center rounded-full bg-green"
            >
              {isCheckout ? (
                <SchoolIcon
                  className="text-white "
                  sx={{ fontSize: "1.5rem" }}
                />
              ) : (
                <ShoppingCartIcon
                  className="text-white "
                  sx={{ fontSize: "1.5rem" }}
                />
              )}
            </div>
          </Tooltip>
        </div>
      </div>
    </Layout>
  );
};
