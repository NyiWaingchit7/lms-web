import { Course } from "@/type/course";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Link } from "react-router-dom";
interface Props {
  data: Course;
  shadow?: boolean;
}
export const CourserListCard = ({ data }: Props) => {
  return (
    <Link
      to={`/courses/${data.id}`}
      className={`p-3 rounded-lg relative cursor-pointer w-full `}
    >
      <div className="relative h-[170px]">
        <div className="glass-card">
          <OpenInNewIcon className="text-white course-detail-icon scale-0" />
        </div>
        <img
          src={data.assetUrl}
          className="w-full h-full object-cover rounded-md"
          alt=""
        />
      </div>
      <h3 className="text-xs md:text-lg font-semibold mt-3">{data.title}</h3>
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
