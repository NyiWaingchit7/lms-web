import { useEffect, useState } from "react";
import { Layout } from "@/component/layout/Layout";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { handleGetCourses } from "@/store/slice/courseSlice";
import { Skeleton } from "@mui/material";
import { Title } from "@/component/layout/Title";
import { CourserListCardV2 } from "@/component/card/course/CourseListCardV2";
import { Pagination } from "@/component/pagination/Pagination";
import { getQuery } from "@/utils/getQuery";
import { getCategory } from "@/store/slice/appSlice";
import { useNavigate } from "react-router-dom";
import { buildQuery } from "@/utils/buildQury";

export const CoursesPage = () => {
  const dispatch = useAppDispatch();
  const {
    items: courses,
    isLoading,
    links,
    total,
  } = useAppSelector((store) => store.courses);
  const { category } = useAppSelector((store) => store.app);
  const navigate = useNavigate();
  const pagination = () => {
    return Math.ceil(total / 9);
  };
  const types = [
    {
      name: "All",
      value: "",
    },
    {
      name: "Premium",
      value: "true",
    },
    {
      name: "Free",
      value: "false",
    },
  ];

  const query = getQuery();

  const [filterKeys, setFilterKeys] = useState<{
    page: string;
    isPremium: string | boolean;
    categories: number[];
  }>({
    page: query?.page || "1",
    isPremium: query?.isPremium || "",
    categories: query?.categories
      ? query?.categories?.split(",").map(Number)
      : [],
  });

  const selectCategory = (id: number) => {
    setFilterKeys({
      ...filterKeys,
      page: "1",
      categories: filterKeys.categories.includes(id)
        ? filterKeys.categories.filter((item) => item !== id)
        : [...filterKeys.categories, id],
    });
  };

  const clearFilter = () => {
    setFilterKeys({
      categories: [],
      isPremium: "",
      page: "1",
    });
  };

  useEffect(() => {
    const query = buildQuery({ ...filterKeys });
    navigate(`${query}`);

    dispatch(
      handleGetCourses({
        ...filterKeys,
        categoryId: filterKeys.categories.join(","),
      })
    );
  }, [filterKeys]);
  useEffect(() => {
    dispatch(getCategory());
  }, []);

  useEffect(() => {
    pagination();
  }, [total]);

  return (
    <Layout>
      <Title title="Courses" />
      <div className="container flex gap-10  mt-5">
        <div className="w-[400px] border border-slate-200 rounded-lg pt-5 pb-10 h-fit sticky top-[90px] px-3 space-y-5">
          <div className="flex justify-between items-center">
            <h4 className="text-xl font-semibold">Filters</h4>
            <h4
              onClick={clearFilter}
              className=" text-base cursor-pointer px-3 bg-red text-white rounded-md duration-300 hover:opacity-80"
            >
              Reset
            </h4>
          </div>
          <div>
            {/* <h5 className="font-medium text-base mb-3">Categories</h5> */}
            <div className="flex gap-2">
              {types.map((type) => (
                <div
                  key={type.name}
                  className={`px-5 py-1 border border-green rounded-full cursor-pointer ${
                    type.value === filterKeys.isPremium
                      ? "bg-green text-white"
                      : ""
                  }`}
                  onClick={() =>
                    filterKeys.isPremium !== type.value &&
                    setFilterKeys({
                      ...filterKeys,
                      page: "1",
                      isPremium: type.value,
                    })
                  }
                >
                  <small> {type.name}</small>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h5 className="font-medium text-base mb-3">Categories</h5>
            <div className="flex flex-wrap gap-2">
              {category.map((item) => (
                <div
                  key={item.id}
                  className={`px-3 py-1 border border-green rounded-full cursor-pointer ${
                    filterKeys.categories.includes(item.id as number)
                      ? "bg-green text-white "
                      : ""
                  }`}
                  onClick={() => {
                    selectCategory(Number(item.id));
                  }}
                >
                  <small> {item.name} </small>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="relative grid grid-cols-1 gap-5 md:grid-cols-3 w-full">
            {isLoading ? (
              <>
                {Array(6)
                  .fill(0)
                  .map((_, index) => (
                    <div
                      className="bg-white pb-3  border border-slate-200 rounded-md shadow-sm space-y-3"
                      key={index}
                    >
                      <Skeleton
                        animation="wave"
                        variant="rectangular"
                        height={150}
                      />
                      <Skeleton
                        animation="wave"
                        variant="rectangular"
                        height={15}
                        width={150}
                        sx={{ marginLeft: "10px" }}
                      />
                      <Skeleton
                        animation="wave"
                        variant="rectangular"
                        height={15}
                        width={80}
                        sx={{ marginLeft: "10px" }}
                      />
                    </div>
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
          <Pagination
            links={links}
            paginations={pagination()}
            page={filterKeys.page}
            paginated={(data) => {
              setFilterKeys({ ...filterKeys, page: data });
            }}
          />
        </div>
      </div>
    </Layout>
  );
};
