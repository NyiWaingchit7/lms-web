import { Course } from "@/type/course";

interface Props {
  lectures: Course[];
}
export const MyCourses = ({ lectures }: Props) => {
  return (
    <div>
      {lectures?.length ? (
        lectures?.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between gap-10 p-3 border border-black !border-opacity-10  transition-all duration-300 ease-in-out max-w-screen-sm rounded-xl"
          >
            <div className="flex items-center gap-5 md:gap-10">
              <img
                src={item.assetUrl}
                alt={item.title}
                className="w-20 rounded-xl"
              />
              <h5 className="text-xs md:text-sm">{item.title}</h5>
            </div>
            <div>
              <button className="login-btn rounded-xl text-xs hidden md:block">
                Watch
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="w-full h-[300px] flex justify-center items-center bg-black/5">
          <p className="text-body">There is no courses yet</p>
        </div>
      )}
    </div>
  );
};
