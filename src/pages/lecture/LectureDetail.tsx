import { Link, useNavigate, useParams } from "react-router-dom";
import { Layout } from "@/component/layout/Layout";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Course } from "@/type/course";
import { useEffect, useState } from "react";
import {
  courseDetail,
  courseLoading,
  setCourseDetail,
} from "@/store/slice/courseSlice";
import { Title } from "@/component/layout/Title";
import { Chip } from "@mui/material";
import { Loading } from "@/component/loading/Loading";

export const CoursesDetail = () => {
  const data = useAppSelector((store) => store.courses.detail) as Course;
  const param = useParams();
  const id = Number(param.id);
  const dispatch = useAppDispatch();
  const loading = useAppSelector((store) => store.courses.isLoading);
  const navigate = useNavigate();
  const [onPlay, setPlay] = useState<any>();
  const navigation = () => {
    navigate("/checkout", {
      state: { data },
    });
  };
  useEffect(() => {
    dispatch(courseDetail({ id }));
    dispatch(courseLoading(true));
    return () => {
      dispatch(setCourseDetail(null));
    };
  }, []);
  useEffect(() => {
    setPlay(dummyVideo[0]);
    // console.log(onPlay);
  }, []);
  return (
    <Layout>
      <Title title={data?.title || ""} />

      <div>
        {loading ? (
          <Loading />
        ) : (
          <div>
            {/* <img
              src={data?.assetUrl || ""}
              className="w-full h-full   object-cover mb-10"
              alt=""
            /> */}

            {data?.Lesson?.length ? (
              <div className="container">
                <div className="md:grid border border-black shadow-sm border-opacity-10 rounded-lg p-3 py-10  md:grid-cols-2 gap-3">
                  <div className="">
                    <div className="w-full md:h-[400px]">
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
                    </div>
                  </div>
                  <div className="flex flex-col gap-3 h-[400px] mt-5 md:mt-0 overflow-y-auto no-arrows px-2">
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
                        className={`border border-black border-opacity-20 flex items-center gap-3 cursor-pointer rounded-lg p-4 shadow-sm hover:border-opacity-90 transition duration-300 ${
                          item?.title === onPlay?.title
                            ? "border-2 !border-green"
                            : ""
                        }`}
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
              <div className="container relative my-5 h-[300px] bg-secondary shadow-sm rounded-lg ">
                <p className="text-center absolute top-1/2 left-1/2 translate-y-1/2 -translate-x-1/2">
                  There is no lesson yet!
                </p>
              </div>
            )}
          </div>
        )}
        <div className="container">
          <div className="md:flex gap-5 items-center">
            <h2 className="font-semibold md:text-2xl">{data?.title}</h2>
            <div className="flex gap-2 flex-wrap mt-5 md:mt-0">
              {data?.categories?.map((item) => (
                <Link to={`/categories/${item.id}/${item.name}`} key={item.id}>
                  <Chip label={item?.name} variant="outlined" color="success" />
                </Link>
              ))}
            </div>
          </div>
          {data?.isPremium ? (
            <div className="mt-5">
              <span className="font-semibold me-3">
                {" "}
                Price - {data?.discount_price || data?.price}MMK
              </span>
              <button className="login-btn text-sm" onClick={navigation}>
                Buy Now
              </button>
            </div>
          ) : (
            ""
          )}
          <p className="md:ms-5 mt-5"> {data?.description} </p>
        </div>
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
