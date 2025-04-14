import moment from "moment";
export const Footer = () => {
  return (
    <div className="w-full bg-white py-3 text-xs sm:text-[15px] flex justify-center">
      <div>© LMS {moment().format("Y")}. All Rights Reserved</div>
    </div>
  );
};
