import { Link, useParams } from "react-router-dom";
import { Layout } from "../../component/layout/Layout";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Course } from "../../type/course";
import { useEffect, useState } from "react";
import { courseDetail, courseLoading } from "../../store/slice/courseSlice";
import { Title } from "../../component/layout/Title";
import { Chip } from "@mui/material";
import ReactPlayer from "react-player";

export const CoursesDetail = () => {
  const data = useAppSelector((store) => store.courses.detail) as Course;
  const param = useParams();
  const id = Number(param.id);
  const dispatch = useAppDispatch();
  const loading = useAppSelector((store) => store.courses.isLoading);
  const [onPlay, setPlay] = useState<any>();
  useEffect(() => {
    dispatch(courseDetail({ id }));
    dispatch(courseLoading(true));
  }, []);
  useEffect(() => {
    setPlay(dummyVideo[0]);
    console.log(onPlay);
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
              <div className="container">
                <div className="md:grid border border-black shadow-md border-opacity-10 rounded-lg p-3 py-10  md:grid-cols-2 gap-3">
                  <div className="">
                    <div className="w-full h-[400px]">
                      <iframe
                        src={onPlay?.url}
                        title="YouTube video player"
                        allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        className="w-full h-full"
                        allowFullScreen
                      ></iframe>
                    </div>

                    <div className="">
                      <h3 className="text-lg font-semibold">
                        {/* {data?.Lesson[0]?.title} */}
                        {onPlay?.title}
                      </h3>

                      <p className="text-sm"> {data?.Lesson[0].description} </p>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: data?.Lesson[0]?.content,
                        }}
                      ></p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3 h-[400px] overflow-y-auto no-arrows">
                    {/* {data.Lesson.map((item) => (
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
                    ))} */}

                    {dummyVideo.map((item) => (
                      <div
                        key={item.title}
                        className="border border-black border-opacity-20 flex items-center gap-3 cursor-pointer rounded-lg p-4 shadow-sm hover:border-opacity-90 transition duration-300"
                        onClick={() => setPlay(item)}
                      >
                        <img
                          src={"/logo.png"}
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

export const dummyVideo = [
  {
    title: "Javascript 1",
    url: "https://www.youtube.com/embed/Zp3IGrP8N9k",
  },
  {
    title: "Javascript 2",
    url: "https://www.youtube.com/embed/Fo9veKTz0Tg",
  },
  {
    title: "Javascript 3",
    url: "https://www.youtube.com/embed/v_Fb_2iZgkQ",
  },
  {
    title: "Javascript 4",
    url: "https://www.youtube.com/embed/u42YC5llYSk",
  },
  {
    title: "Javascript 5",
    url: "https://www.youtube.com/embed/HMdToMB2nCI",
  },
  {
    title: "Javascript 6",
    url: "https://www.youtube.com/embed/G1eXLiN9eF8",
  },
  {
    title: "Javascript 7",
    url: "https://www.youtube.com/embed/HD48zAa-4sk",
  },
  {
    title: "Javascript 8",
    url: "https://www.youtube.com/embed/L5cC3bijKsk",
  },
  {
    title: "Javascript 9",
    url: "https://www.youtube.com/embed/MKXirfxaL-s",
  },
  {
    title: "Javascript 10",
    url: "https://www.youtube.com/embed/8KFT0eHP_8U",
  },
  {
    title: "Javascript 11",
    url: "https://www.youtube.com/embed/aVBAQd0ZyGA",
  },
];
