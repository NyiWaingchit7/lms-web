import OpenInNewIcon from "@mui/icons-material/OpenInNew";
interface Props {
  free?: boolean;
}
export const CourseCard = ({ free = true }: Props) => {
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
      <h3 className="text-xs md:text-lg font-semibold mt-5">
        Javascript Development
      </h3>
      {!free && (
        <div>
          <p className="line-through text-[10px] sm:text-xs sm:inline">
            100000MMK
          </p>
          <p className="text-xs sm:text-sm inline sm:ms-2">90000MMK</p>
        </div>
      )}
    </div>
  );
};
