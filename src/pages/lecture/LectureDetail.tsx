import { Link, useParams } from "react-router-dom";
import { Layout } from "../../component/layout/Layout";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Course } from "../../type/course";
import { useEffect } from "react";
import { courseDetail, courseLoading } from "../../store/slice/courseSlice";
import { Title } from "../../component/layout/Title";
import { Chip } from "@mui/material";

export const CoursesDetail = () => {
  const data = useAppSelector((store) => store.courses.detail) as Course;
  const param = useParams();
  const id = Number(param.id);
  const dispatch = useAppDispatch();
  const loading = useAppSelector((store) => store.courses.isLoading);
  useEffect(() => {
    dispatch(courseDetail({ id }));
    dispatch(courseLoading(true));
  }, []);
  return (
    <Layout>
      <Title title={data?.title || ""} />
      <div>
        {loading ? (
          <div>loading</div>
        ) : (
          <div>
            <img
              src={data?.assetUrl || ""}
              className="w-full h-full   object-cover mb-10"
              alt=""
            />
            <div className="container">
              <div className="flex gap-5 items-start">
                <h2 className="font-semibold text-2xl mb-5">{data?.title}</h2>
                <div className="flex gap-2">
                  {data?.categories?.map((item) => (
                    <Link
                      to={`/categories/${item.id}/${item.name}`}
                      key={item.id}
                    >
                      <Chip
                        label={item?.name}
                        variant="outlined"
                        color="success"
                      />
                    </Link>
                  ))}
                </div>
              </div>
              <p className="ms-5"> {data?.description} </p>
            </div>
            {data?.Lesson?.length ? (
              <div className="container ">
                <div className="grid gap-2 border border-black shadow-md border-opacity-10 rounded-lg p-3  md:grid-cols-2">
                  <div>
                    <img
                      src={data?.Lesson[0]?.assetImage}
                      alt="lectureImg"
                      className="w-full"
                    />{" "}
                    <div>
                      <h3 className="text-lg font-semibold">
                        {data?.Lesson[0]?.title}
                      </h3>

                      <p className="text-sm"> {data?.Lesson[0].description} </p>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: data?.Lesson[0]?.content,
                        }}
                      ></p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3 h-fit overflow-y-auto no-arrows">
                    {data.Lesson.map((item) => (
                      <div
                        key={item.id}
                        className="border border-black border-opacity-20 flex items-center gap-3 cursor-pointer rounded-lg p-4 shadow-sm hover:border-opacity-90 transition duration-300"
                      >
                        <img
                          src={item.assetImage}
                          className="w-15 h-15 object-cover rounded-lg"
                          alt=""
                        />
                        <h3 className="font-semibold"> {item.title} </h3>
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
