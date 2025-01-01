import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Lecture } from "../../../type/lecture";
interface Props {
  data: Lecture;
}
export const CourseCard = ({ data }: Props) => {
  return (
    <div className="shadow-md p-3 rounded-lg relative cursor-pointer ">
      <div className="relative">
        <div className="absolute top-0 left-0 w-full h-full flex bg-white bg-opacity-10 backdrop-blur-sm justify-center items-center  bg-black/50 opacity-0 hover:opacity-100 rounded-t-lg transition-opacity duration-500 ease-in-out">
          <OpenInNewIcon className="text-white" />
        </div>
        <img
          src="/banner.jpg"
          className="w-full object-cover rounded-md"
          alt=""
        />
      </div>
      <h3 className="text-xs md:text-lg font-semibold mt-5">{data.title}</h3>
      {data.isPremium && (
        <div>
          {data.discount_price && (
            <p className="line-through text-[10px] sm:text-xs sm:inline">
              {data.price?.toLocaleString()} MMK
            </p>
          )}
          <p className="text-xs sm:text-sm inline sm:ms-2">
            {data.discount_price?.toLocaleString() ||
              data.price?.toLocaleString()}{" "}
            MMK
          </p>
        </div>
      )}
    </div>
  );
};
