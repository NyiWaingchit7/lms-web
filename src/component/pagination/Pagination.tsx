import { useEffect } from "react";
import { Link } from "react-router-dom";

interface Props {
  links: any[];
}
export const Pagination = ({ links }: Props) => {
  useEffect(() => {}, [links]);
  return (
    <div className="flex gap-2 mt-5">
      {links?.length > 3 &&
        links.map((d, i) => (
          <Link
            to={d.url}
            key={i}
            className={`${
              d.active ? "bg-black text-white" : ""
            } px-4 py-2 rounded-md  capitalize`}
          >
            {d.label}
          </Link>
        ))}
    </div>
  );
};
