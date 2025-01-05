import { useEffect } from "react";
import { CourseCard } from "../../component/card/course/CourseCard";
import { Layout } from "../../component/layout/Layout";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  clearCourses,
  courseLoading,
  handleGetCourses,
  setCourses,
} from "../../store/slice/courseSlice";
import { Skeleton } from "@mui/material";
import { Title } from "../../component/layout/Title";

export const CoursesPage = () => {
  const courses = useAppSelector((store) => store.coursee.items);
  const dispatch = useAppDispatch();
  const loading = useAppSelector((store) => store.coursee.isLoading);
  console.log(courses);

  useEffect(() => {
    dispatch(courseLoading(true));
    dispatch(handleGetCourses({ page: 1 }));
    return () => {
      dispatch(clearCourses());
    };
  }, []);
  return (
    <Layout>
      <Title title="Courses" />
      <div className="container">
        <div></div>
        <div className="grid grid-cols-1 gap-1 xl:gap-3 md:grid-cols-4">
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
          ) : courses.length > 0 ? (
            courses.map((data) => <CourseCard key={data.id} data={data} />)
          ) : (
            <div className="flex justify-center items-center h-[200px]">
              <p>There is no data</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};
