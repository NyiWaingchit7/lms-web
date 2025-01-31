import { Course } from "@/type/course";
import { Link } from "react-router-dom";
interface Props {
  data: Course;
  listing?: boolean;
}
export const CourserListCardV2 = ({ data, listing }: Props) => {
  return (
    <Link
      to={`/courses/${data.id}`}
      className={`rounded-lg relative cursor-pointer w-full block shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 ease-in hover:text-green ${
        listing ? "hover:-translate-y-3" : ""
      } `}
    >
      <div className="relative h-[170px]">
        <img
          src={data.assetUrl}
          className="w-full h-full object-cover"
          alt=""
        />
      </div>
      <h3 className="text-xs md:text-lg font-semibold my-3 px-3">
        {data.title}
      </h3>
      <div className="bg-black/5 text-black p-3 flex justify-between items-center">
        <div>
          {data.isPremium ? (
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
          ) : (
            <div>Free</div>
          )}
        </div>
        <small>
          {data?.Lesson?.length ? ` ${data?.Lesson?.length} lessons` : "zero"}
        </small>
      </div>
    </Link>
  );
};
