import { useEffect } from "react";
import "./App.css";
import Counter from "./component/card/Counter";
import { CourseCard } from "./component/card/course/CourseCard";
import { Layout } from "./component/layout/Layout";
import { Title } from "./component/layout/Title";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { getAppLecture } from "./store/slice/appSlice";
import { Skeleton } from "@mui/material";

function App() {
  const lectures = useAppSelector((store) => store.app.lectures);
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
          {/* <img src="/banner.jpeg" className="w-full md:h-[350px]" alt="" /> */}
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

      <div className="container mb-10">
        <div className="flex justify-between items-center">
          <h3 className="card-header">Free Courses</h3>
          <p className="cursor-pointer text-xs sm:text-sm hover:underline ">
            View all
          </p>
        </div>
        <div className="  grid grid-cols-1 gap-1 xl:gap-3 md:grid-cols-4">
          {loading ? (
            Array(4)
              .fill(0)
              .map((_, index) => (
                <Skeleton
                  animation="wave"
                  key={index}
                  variant="rounded"
                  height={200}
                />
              ))
          ) : lectures.length > 0 ? (
            lectures
              .filter((item) => item.isPremium === false)
              .map((data) => <CourseCard key={data.id} data={data} />)
          ) : (
            <div className="flex justify-center items-center h-[200px]">
              <p>There is no data</p>
            </div>
          )}
        </div>
      </div>
      <div className="container">
        <div className="flex justify-between items-center">
          <h3 className="card-header">Premium Courses</h3>
          <p className="cursor-pointer text-xs sm:text-sm hover:underline ">
            View all
          </p>
        </div>
        <div className=" grid grid-cols-1 gap-1 xl :gap-3 md:grid-cols-4 ">
          {lectures
            .filter((item) => item.isPremium)
            .map((data) => (
              <CourseCard data={data} key={data.id} />
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
