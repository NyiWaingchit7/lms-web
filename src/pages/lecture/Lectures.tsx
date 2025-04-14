import { useEffect, useState } from "react";
import { Layout } from "@/component/layout/Layout";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { handleGetCourses } from "@/store/slice/courseSlice";
import { Drawer, Skeleton } from "@mui/material";
import { Title } from "@/component/layout/Title";
import { CourserListCardV2 } from "@/component/card/course/CourseListCardV2";
import { Pagination } from "@/component/pagination/Pagination";
import { getQuery } from "@/utils/getQuery";
import { getCategory } from "@/store/slice/appSlice";
import { useNavigate } from "react-router-dom";
import { buildQuery } from "@/utils/buildQury";
import { goToTarget } from "@/utils/goToTarget";
import { FilterKeysType } from "@/type/course";
import { CourseFilter } from "@/component/course/Filter";

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
  const [open, setOpen] = useState(false);
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

  const [filterKeys, setFilterKeys] = useState<FilterKeysType>({
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
    setOpen(false);
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
      <div className="container lg:flex gap-10  mt-5" id="courses">
        <button
          onClick={() => setOpen(true)}
          className="bg-green text-white px-4 py-2 rounded-md mb-5 lg:hidden flex items-center text-sm"
        >
          Filters <i className="fa-solid fa-filter ps-3"></i>
        </button>

        <div className="w-[400px] hidden lg:block">
          <CourseFilter
            filterKeys={filterKeys}
            setFilterKeys={setFilterKeys}
            selectCategory={selectCategory}
            types={types}
            category={category}
            clearFilter={clearFilter}
          />
        </div>
        <div className="w-full">
          <div className="relative grid grid-cols-1 gap-5 md:grid-cols-3 w-full">
            {isLoading ? (
              <>
                {Array(9)
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
              goToTarget("courses");
            }}
          />
        </div>
      </div>
      <Drawer open={open} onClose={() => setOpen(false)}>
        <div className="my-5 flex justify-end px-5">
          <button onClick={() => setOpen(false)}>
            {" "}
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        <CourseFilter
          filterKeys={filterKeys}
          setFilterKeys={setFilterKeys}
          selectCategory={selectCategory}
          types={types}
          category={category}
          clearFilter={clearFilter}
        />
      </Drawer>
    </Layout>
  );
};
