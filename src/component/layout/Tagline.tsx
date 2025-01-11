import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getAppTagLine } from "../../store/slice/appSlice";
import Marquee from "react-fast-marquee";
export const TagLine = () => {
  const dispatch = useAppDispatch();
  const { tagLines } = useAppSelector((store) => store.app);

  useEffect(() => {
    dispatch(getAppTagLine());
  }, []);
  return (
    <div>
      <div className="bg-brown text-white py-1 md:py-3">
        <Marquee className="container" direction="right" speed={100}>
          <div className="flex gap-17">
            {tagLines.map((d) => (
              <p className="text-xs sm:text-sm" key={d.id}>
                {d.title}
              </p>
            ))}
          </div>
        </Marquee>
      </div>
    </div>
  );
};
