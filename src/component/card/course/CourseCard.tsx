import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Course } from "../../../type/course";
import { Link } from "react-router-dom";
interface Props {
  data: Course;
}
export const CourseCard = ({ data }: Props) => {
  return (
    <Link
      to={`/courses/${data.id}`}
      className="shadow-md p-3 rounded-lg relative cursor-pointer "
    >
      <div className="relative h-[150px]">
        <div className="absolute top-0 left-0 w-full h-full flex bg-white bg-opacity-10 backdrop-blur-sm justify-center items-center  bg-black/50 opacity-0 hover:opacity-100 rounded-t-lg transition-opacity duration-500 ease-in-out">
          <OpenInNewIcon className="text-white" />
        </div>
        <img
          src={data.assetUrl}
          className="w-full h-full object-cover rounded-md"
          alt=""
        />
      </div>
      <h3 className="text-xs md:text-lg font-semibold mt-5">{data.title}</h3>
      {data.isPremium && (
        <div>
          <p className="text-xs sm:text-sm inline ">
            {data.discount_price
              ? data.discount_price?.toLocaleString()
              : data.price?.toLocaleString()}
            MMK
          </p>
          {data.discount_price ? (
            <p className="line-through text-[10px] sm:text-xs sm:inline sm:ms-2">
              {data.price?.toLocaleString()} MMK
            </p>
          ) : (
            ""
          )}
        </div>
      )}
    </Link>
  );
};
