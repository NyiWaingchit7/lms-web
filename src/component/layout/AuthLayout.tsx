import { ReactNode } from "react";
import { Title } from "./Title";
import { Link } from "react-router-dom";
import { useAppSelector } from "@/store/hooks";

interface Props {
  children: ReactNode;
  title: string;
}

export const AuthLayout = ({ children, title }: Props) => {
  const { setting } = useAppSelector((store) => store.app);
  return (
    <div className="bg-green min-h-screen flex  justify-center items-center ">
      <Title title={title} />

      <div className="w-full mx-3 flex  flex-col justify-center items-center ">
        <div className="flex justify-center items-end gap-2">
          <Link to={"/"}>
            {" "}
            <img src="/logo.png" className="h-10" alt="" />
          </Link>
          <h3 className="text-xl md:text-3xl text-white font-semibold">
            {setting?.app_name || " Akone Learn"}
          </h3>
        </div>
        {children}
      </div>
    </div>
  );
};
