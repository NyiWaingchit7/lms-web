import { useParams } from "react-router-dom";
import { Layout } from "../../component/layout/Layout";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Course } from "../../type/course";
import { useEffect } from "react";
import { courseDetail, courseLoading } from "../../store/slice/courseSlice";

export const CoursesDetail = () => {
  const data = useAppSelector((store) => store.coursee.detail) as Course;
  const param = useParams();
  const id = Number(param.id);
  const dispatch = useAppDispatch();
  const loading = useAppSelector((store) => store.coursee.isLoading);
  useEffect(() => {
    dispatch(courseDetail({ id }));
    dispatch(courseLoading(true));
  }, []);
  return (
    <Layout>
      <div>
        {loading ? (
          <div>loading</div>
        ) : (
          <div>
            <img
              src={data?.assetUrl || ""}
              className="w-full h-full  md:h-[400px] object-cover mb-10"
              alt=""
            />
            <div className="container">
              <h2 className="font-semibold text-2xl mb-5">{data?.title}</h2>
              <p className="ms-5"> {data?.description} </p>
            </div>
            {data?.Lesson?.length ? (
              <div className="container ">
                <div className="grid gap-2 border border-black shadow-md border-opacity-10 rounded-lg p-3  md:grid-cols-2">
                  <div>
                    <img
                      src={data?.Lesson[0]?.assetImage}
                      alt=""
                      className="w-full"
                    />{" "}
                  </div>
                  <div className="flex flex-col gap-3 max-h-20 overflow-y-auto no-arrows">
                    {data.Lesson.map((item) => (
                      <div className="border border-black border-opacity-20 rounded-lg p-4 shadow-sm">
                        <img
                          src={item.assetImage}
                          className="w-15 h-15 object-cover rounded-lg"
                          alt=""
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};
