import { Course } from "@/type/course";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import SchoolIcon from "@mui/icons-material/School";
import { Link } from "react-router-dom";
interface Props {
  data: Course;
  shadow?: boolean;
}
export const CourseCard = ({ data }: Props) => {

  return (
    <Link to={`/courses/${data.id}`}>
      <div className="relative group course-card cursor-pointer">
        <div className="absolute inset-0 w-full  h-full">
          <img
            src={data.assetUrl}
            className="w-full rounded-lg h-full object-cover"
            alt=""
          />
        </div>
        <div className="absolute inset-0 z-[1]">
          <div className="p-5 relative text-white flex flex-col justify-between h-full">
            <div>
              <div className="flex">
                <SchoolIcon className="title-icon" />
                <h6 className=" mb-2 course-title font-semibold ">
                  {data.title}
                </h6>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-center">
                <OpenInNewIcon className="course-detail-icon" />
              </h4>
            </div>
            <div className="course-price flex justify-end">
              <h6 className="me-1 text-sm">
                {data.isPremium ? (
                  <div>
                    {data.discount_price ? (
                      <p className="line-through text-[10px] sm:text-xs sm:inline sm:ms-2 font-medium">
                        {data.price?.toLocaleString()} MMK
                      </p>
                    ) : (
                      ""
                    )}
                    <p className="text-xs sm:text-sm inline font-medium ">
                      {data.discount_price
                        ? data.discount_price?.toLocaleString()
                        : data.price?.toLocaleString()}
                      MMK
                    </p>
                  </div>
                ) : (
                  <p className="font-medium inline ">FREE</p>
                )}
              </h6>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
