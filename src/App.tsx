import { useEffect } from "react";
import "./App.css";
import Counter from "./component/card/Counter";
import { CourseCard } from "./component/card/course/CourseCard";
import { Layout } from "./component/layout/Layout";
import { Title } from "./component/layout/Title";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { getAppLecture } from "./store/slice/appSlice";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Skeleton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { SwiperWrapper } from "./component/swiper/SwiperWrapper";
import { SwiperSlide } from "swiper/react";
function App() {
  const lectures = useAppSelector((store) => store.app.lectures);
  const freeLectures = useAppSelector((store) => store.app.free_lectures);

  const dispatch = useAppDispatch();
  const loading = useAppSelector((store) => store.app.isLoading);
  useEffect(() => {
    dispatch(getAppLecture());
  }, []);
  return (
    <Layout>
      <Title title="Home" />
      <div
        className="mb-10 h-[162px] md:h-[400px] md:bg-center"
        style={{
          backgroundImage: `url(/banner.jpg)`,
          backgroundSize: "100%",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="container flex items-center justify-center md:h-[350px]">
          <div className="max-w-screen-sm text-center text-white drop-shadow-2xl">
            <h3 className="md:text-5xl font-semibold ">
              Welcome to Akone Learn!
            </h3>
            <p className=" font-semibold text-[10px] md:text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum modi
              dolorem veniam. Quos magnam pariatur amet consequuntur
            </p>
            <div className="flex items-center justify-center gap-3 mt-2">
              <div className="home-btn bg-blue-500">fackebook</div>
              <div className="home-btn bg-red">youtube</div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mb-10 overflow-x-hidden">
        <div className="flex justify-between items-center  gap-3">
          {Object.entries(data).map(([key, value]) => (
            <div className=" p-3 md:p-5 rounded-lg shadow-md" key={key}>
              <Counter end={value} />
              <p className="text-center text-xs sm:text-sm capitalize">
                {key.replace("_", " ")}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="container ">
        <div className="flex justify-between items-center">
          <h3 className="card-header">Free Courses</h3>

          <p className="cursor-pointer text-xs sm:text-sm hover:underline ">
            View all
          </p>
        </div>
        <div className="">
          {loading ? (
            <div className="grid grid-cols-1 gap-1 xl:gap-3 md:grid-cols-4 mt-5">
              {Array(4)
                .fill(0)
                .map((_, index) => (
                  <Skeleton
                    animation="wave"
                    key={index}
                    variant="rounded"
                    height={200}
                  />
                ))}
            </div>
          ) : freeLectures.length > 0 ? (
            <SwiperWrapper>
              {freeLectures.map((data) => (
                <SwiperSlide key={data.id}>
                  <CourseCard data={data} />
                </SwiperSlide>
              ))}
            </SwiperWrapper>
          ) : (
            <div className="flex justify-center items-center h-[200px]">
              <p>There is no data</p>
            </div>
          )}
        </div>
      </div>
      <div className="container mb-10 overflow-x-hidden">
        <div className="flex justify-between items-center">
          <h3 className="card-header">Premium Courses</h3>

          <p className="cursor-pointer text-xs sm:text-sm hover:underline ">
            View all
          </p>
        </div>
        <div className="">
          {loading ? (
            <div className="grid grid-cols-1 gap-1 xl:gap-3 md:grid-cols-4 mt-5">
              {Array(4)
                .fill(0)
                .map((_, index) => (
                  <Skeleton
                    animation="wave"
                    key={index}
                    variant="rounded"
                    height={200}
                  />
                ))}
            </div>
          ) : lectures.length > 0 ? (
            <SwiperWrapper>
              {lectures.map((data) => (
                <SwiperSlide key={data.id}>
                  <CourseCard data={data} />
                </SwiperSlide>
              ))}
            </SwiperWrapper>
          ) : (
            <div className="flex justify-center items-center h-[200px]">
              <p>There is no data</p>
            </div>
          )}
        </div>
      </div>
      <div className="container">
        <h3 className="card-header">FAQs</h3>
        <div className=" border border-green border-opacity-35  rounded-lg mt-3">
          {faq.map((data) => (
            <Accordion
              key={data.question}
              disableGutters
              className="w-full !shadow-none border-b-[1px] border-opacity-35 border-green py-2 !bg-transparent"
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                className="font-semibold !text-black !text-opacity-70 transition duration-300 hover:!text-opacity-100 active:!text-opacity-100"
              >
                {data.question}
              </AccordionSummary>
              <AccordionDetails className="text-xs md:text-sm">
                {data.answer}
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default App;

export const data: { [key: string]: number } = {
  free_courses: 12,
  total_students: 20,
  total_purchases: 50,
  premium_courses: 50,
};

const faq = [
  {
    question: "What courses are available on the website?",
    answer:
      "We offer a wide range of courses, including coding, design, marketing, business, and personal development. Check our course catalog for the full list.",
  },
  {
    question: "Are the courses self-paced?",
    answer:
      "Yes, most courses are self-paced, allowing you to learn at your convenience. Some live sessions or scheduled events may have fixed timings.",
  },
  {
    question: "Do I get a certificate after completing a course?",
    answer:
      "Yes, certificates are provided for most courses upon successful completion. Check the course details for specific information.",
  },
  {
    question: "Is there support available if I face issues?",
    answer:
      "Absolutely! You can contact our support team via email or live chat, available 24/7.",
  },

  {
    question: "Can I access the courses on mobile?",
    answer:
      "Yes, our platform is mobile-friendly, and you can learn on the go using any device.",
  },
  {
    question: "How can I stay updated on new courses and offers?",
    answer:
      "Sign up for our newsletter or follow us on social media to get updates on the latest courses and exclusive discounts.",
  },
];
