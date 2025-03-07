import { useEffect } from "react";
import "./App.css";
import Counter from "./component/card/Counter";
import { Layout } from "./component/layout/Layout";
import { Title } from "./component/layout/Title";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { getAppLecture, getCategory, getHome } from "./store/slice/appSlice";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Skeleton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { SwiperSlide } from "swiper/react";
import { Loading } from "./component/loading/Loading";
import { SwiperWrapper } from "./component/swiper/SwiperWrapper";
import { CourseCard } from "./component/card/course/CourseCard";
import { CourserListCardV2 } from "./component/card/course/CourseListCardV2";
import AOS from "aos";
import "aos/dist/aos.css";
function App() {
  const {
    lectures,
    free_lectures,
    isLoading,
    setting,
    popular_lectures,
    counts,
    faq,
  } = useAppSelector((store) => store.app);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAppLecture());
    dispatch(getHome());
    dispatch(getCategory());
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);
  return (
    <Layout>
      <Title title="Home" />
      {isLoading ? <Loading /> : ""}
      <div
        className="mb-5 h-[162px] md:h-[450px] md:bg-center home-banner"
        style={{
          backgroundImage: `url(/banner.jpg)`,
          backgroundSize: "100%",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="container flex items-center justify-center md:h-[350px]">
          <div className="max-w-screen-sm text-center text-white drop-shadow-2xl">
            <h3 className="md:text-5xl font-semibold ">
              Welcome to {setting?.app_name || "test"}!
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

      <div className="container mb-10">
        <div className="md:flex justify-between items-center grid grid-cols-2 md:grid-cols-none  gap-3">
          {counts &&
            Object.entries(counts).map(([key, value]) => (
              <div
                className="md:w-[200px] p-3 md:p-5 rounded-lg shadow-md"
                key={key}
                data-aos="fade-up"
              >
                {value !== undefined && value !== null && (
                  <Counter end={Number(value)} />
                )}
                <p className="text-center text-xs sm:text-sm capitalize">
                  {key.replace("_", " ")}
                </p>
              </div>
            ))}
        </div>
      </div>
      <div className="container mb-10">
        <h3 className="card-header border-s-4 px-2 border-green">
          Popular Courses
        </h3>
        {isLoading ? (
          <div className="grid grid-cols-1 gap-1 xl:gap-3 md:grid-cols-3 mt-3">
            {Array(3)
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
        ) : lectures?.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3 mt-3">
            {popular_lectures.map((data) => (
              <CourseCard key={data.id} data={data.lecture} />
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center h-[200px]">
            <p>There is no data</p>
          </div>
        )}
      </div>

      <div className="container mb-10">
        <h3 className="card-header border-s-4 px-2 border-green">
          Free Courses
        </h3>

        <div className="">
          {isLoading ? (
            <div className="grid grid-cols-1 gap-1 xl:gap-3 md:grid-cols-4 mt-3">
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
          ) : free_lectures?.length > 0 ? (
            <SwiperWrapper>
              {free_lectures.map((data) => (
                <SwiperSlide key={data.id}>
                  <CourserListCardV2 data={data} />
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
        <h3 className="card-header border-s-4 px-2 border-green">
          Premium Courses
        </h3>

        <div className="">
          {isLoading ? (
            <div className="grid grid-cols-1 gap-1 xl:gap-3 md:grid-cols-4 mt-3">
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
          ) : lectures?.length > 0 ? (
            <SwiperWrapper>
              {lectures.map((data) => (
                <SwiperSlide key={data.id}>
                  <CourserListCardV2 data={data} />
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
      {/* <div className="container mb-10">
        <div className="">
          {isLoading ? (
            <div className="grid grid-cols-1 gap-1 xl:gap-3 md:grid-cols-4 mt-5">
              {Array(4)
                .fill(0)
                .map((_, index) => (
                  <Skeleton
                    animation="wave"
                    key={index}
                    variant="circular"
                    height={150}
                    width={150}
                  />
                ))}
            </div>
          ) : category?.length > 0 ? (
            <div className="flex justify-between gap-4 items-center overflow-x-auto no-scrollbar">
              {category.map((data) => (
                <Link
                  to={`/categories/${data.id}/${data.name}`}
                  className="flex-shrink-0 flex-auto flex  flex-col justify-between gap-3 items-center"
                  key={data.id}
                >
                  <img
                    className="w-25 h-25 md:w-30 md:h-30 object-cover rounded-full"
                    src={data.assetUrl}
                    alt={data.name}
                  />
                  <h4 className="text-xs md:text-lg font-semibold text-center">
                    {data.name}
                  </h4>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center h-[200px]">
              <p>There is no data</p>
            </div>
          )}
        </div>
      </div> */}
      <div className="container">
        <h3 className="card-header border-s-4 px-2 border-green">FAQs</h3>
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
