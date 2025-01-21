import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  pageIncrement,
  handleGetCourses,
  courseLoading,
  cleanCourseSlice,
} from "@/store/slice/courseSlice";
import { Skeleton } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Layout } from "@/component/layout/Layout";
import { Title } from "@/component/layout/Title";
import { CardLoadMore } from "@/component/card/CardLoadMore";
import { Loading } from "@/component/loading/Loading";
import { CourserListCard } from "@/component/card/course/CourseListCard";

export const LectureWithCategory = () => {
  const param = useParams();

  const id = Number(param.id);
  const categoryName = param.category;
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
    dispatch(handleGetCourses({ page: page + 1, categoryId: id }));
  };

  useEffect(() => {
    dispatch(courseLoading(true));
    dispatch(handleGetCourses({ page: 1, categoryId: id }));
    return () => {
      dispatch(cleanCourseSlice());
    };
  }, []);
  return (
    <Layout>
      <Title title={categoryName || "Category Lecture"} />
      <div className="container">
        <div></div>
        <div className="relative grid grid-cols-1 gap-1 xl:gap-3 md:grid-cols-4 mt-5">
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
              <CourserListCard key={data.id} data={data} shadow={true} />
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
