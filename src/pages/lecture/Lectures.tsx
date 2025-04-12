import { useEffect } from "react";
import { Layout } from "@/component/layout/Layout";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { handleGetCourses } from "@/store/slice/courseSlice";
import { Skeleton } from "@mui/material";
import { Title } from "@/component/layout/Title";
import { CourserListCardV2 } from "@/component/card/course/CourseListCardV2";
import { Pagination } from "@/component/pagination/Pagination";
import { getQuery } from "@/utils/getQuery";

export const CoursesPage = () => {
  const dispatch = useAppDispatch();
  const {
    items: courses,
    isLoading,
    links,
  } = useAppSelector((store) => store.courses);

  const { page } = getQuery();

  useEffect(() => {
    dispatch(handleGetCourses({ page }));
  }, [page]);

  return (
    <Layout>
      <Title title="Courses" />
      <div className="container flex gap-10  mt-5">
        <div className="w-[500px] bg-black h-[60vh] sticky top-[90px]"></div>
        <div className="w-full">
          <div className="relative grid grid-cols-1 gap-5 md:grid-cols-3 w-full">
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
          <Pagination links={links} />
        </div>
      </div>
    </Layout>
  );
};
