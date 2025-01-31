import { useEffect, useState } from "react";
import { Layout } from "@/component/layout/Layout";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  cleanCourseSlice,
  courseLoading,
  handleGetCourses,
  pageIncrement,
} from "@/store/slice/courseSlice";
import { Skeleton } from "@mui/material";
import { Title } from "@/component/layout/Title";
import { CardLoadMore } from "@/component/card/CardLoadMore";
import { Loading } from "@/component/loading/Loading";
import { CourserListCardV2 } from "@/component/card/course/CourseListCardV2";

export const CoursesPage = () => {
  const dispatch = useAppDispatch();
  const {
    items: courses,
    isLoading,
    page,
    has_more_page,
  } = useAppSelector((store) => store.courses);
  const [buttonLoad, setButtonLoad] = useState(false);

  const handleLoadmore = () => {
    setButtonLoad(true);
    dispatch(pageIncrement());
    dispatch(handleGetCourses({ page: page + 1 }));
  };

  useEffect(() => {
    dispatch(courseLoading(true));
    dispatch(handleGetCourses({ page: 1 }));
    return () => {
      dispatch(cleanCourseSlice());
    };
  }, []);
  return (
    <Layout>
      <Title title="Courses" />
      <div className="container">
        <div></div>
        <div className="relative grid grid-cols-1 gap-2 xl:gap-5 md:grid-cols-4 mt-5">
          {isLoading ? (
            <>
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
              <Loading />
            </>
          ) : courses.length > 0 ? (
            courses.map((data) => (
              <CourserListCardV2 key={data.id} data={data} listing={true} />
            ))
          ) : (
            <div className=" absolute inset-0 flex justify-center items-center h-[200px]">
              <p>There is no data</p>
            </div>
          )}
        </div>
        {has_more_page ? (
          <div className="mt-5 flex justify-center">
            {buttonLoad ? (
              <CardLoadMore />
            ) : (
              <button className="loadmore-btn" onClick={handleLoadmore}>
                Load More
              </button>
            )}
          </div>
        ) : (
          ""
        )}
      </div>
    </Layout>
  );
};
