import { Layout } from "@/component/layout/Layout";
import { Title } from "@/component/layout/Title";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Tooltip,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect, useState } from "react";
import { courseDetail, setCourseDetail } from "@/store/slice/courseSlice";
import SchoolIcon from "@mui/icons-material/School";
import { Course } from "@/type/course";
import { createCheckout } from "@/store/slice/checkoutSlice";
import { PaymentScreenShot } from "@/component/checkout/PaymentScreenshot";
import toast from "react-hot-toast";
import { getPayment } from "@/store/slice/appSlice";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export const Checkout = () => {
  const location = useLocation();
  const { data } = location.state || {};
  const dispatch = useAppDispatch();
  const course = useAppSelector((store) => store.courses.detail) as Course;
  const [isCheckout, setCheckout] = useState(true);
  const [payment_assetUrl, setPayment] = useState("");
  const navigate = useNavigate();
  const { payment } = useAppSelector((store) => store.app);
  const handleCheckout = () => {
    dispatch(
      createCheckout({
        lectureId: data.id as number,
        total_price: data.discount_price || data.price,
        payment_assetUrl,
        onSuccess: () => {
          toast.success("We will sent email about purchasement.");
          navigate("/courses");
        },
      })
    );
  };
  useEffect(() => {
    if (data) {
      dispatch(courseDetail({ id: Number(data.id) }));
      dispatch(getPayment());
    }
    return () => {
      dispatch(setCourseDetail(null));
    };
  }, []);
  return (
    <Layout>
      <Title title="Checkout" />
      <div className="container">
        <div className="relative flex max-w-screen-md mx-auto  md:p-5 rounded-md ">
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
                  <div>
                    <Accordion
                      disableGutters
                      className="w-full !shadow-none border-b-[1px] border-opacity-35 border-green py-2 !bg-transparent"
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        className="font-semibold !text-black !text-opacity-70 transition duration-300 hover:!text-opacity-100 active:!text-opacity-100"
                      >
                        Payment method
                      </AccordionSummary>
                      <AccordionDetails className="text-xs md:text-sm">
                        {payment.map((item) => (
                          <div className="flex  gap-5">
                            <img
                              src={item.payment_bank.assetUrl}
                              alt={item.name}
                              className="w-25 h-20 object-cover"
                            />
                            <div className="flex flex-col">
                              <span>{item.name}</span>
                              <span>{item.phone_number}</span>
                              <small className=" capitalize">
                                {item.payment_bank.name}
                              </small>
                            </div>
                          </div>
                        ))}
                      </AccordionDetails>
                    </Accordion>
                  </div>
                  <div className="mt-5 ">
                    {/* <label htmlFor="payment">Choose Payment screenshoot</label>
                    <TextField id="payment" fullWidth type="file" /> */}
                    {/* <div className="w-full h-[300px] bg-black/5 flex justify-center items-center rounded-md">
                      <p className="text-body">!no image selected</p>
                    </div>
                    <div className="flex justify-center mt-5">
                      <label className="px-4 py-2 border border-green text-xs sm:text-sm  rounded-3xl cursor-pointer hover:bg-black/5 transition-all duration-300 ease-in">
                        <input type="file" className="hidden" />
                        Select your payment screenshot
                      </label>
                    </div> */}
                    <PaymentScreenShot
                      onChange={(value) => {
                        setPayment(value);
                      }}
                    />
                  </div>
                  <div className="mt-5">
                    <small className=" text-center d-block">
                      After review your screenshot, I will email you if your
                      payment is success or not. You will see your course under
                      the my courses.
                    </small>
                  </div>
                  <div className="mt-5 flex justify-center">
                    <button
                      className="login-btn z-1 w-full"
                      style={{}}
                      onClick={handleCheckout}
                    >
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
                    {course?.Lesson.map((data) => (
                      <h3 key={data?.id} className="font-medium">
                        - {data?.title}
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
              className="checkout-icon cursor-pointer w-[50px] h-[50px] right-5 absolute flex justify-center items-center rounded-full bg-green"
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
