import { useLimitedPaginations } from "@/utils/useLimitPagination";

interface Props {
  links: any[];
  paginations: number;
  perPage?: number;
  page: string;
  paginated: (data?: any) => void;
}
export const Pagination = ({ paginations, page, paginated }: Props) => {
  const data = useLimitedPaginations(paginations, Number(page));

  return (
    <div className="mt-5">
      {paginations ? (
        <div className="flex gap-3">
          <button>
            <i className="fa-solid fa-angle-left"></i>
          </button>
          {data.map((d, i) => (
            <button
              key={i}
              className={`px-3 py-1 rounded-md text-sm ${
                page == d ? "bg-green text-white " : ""
              }`}
              onClick={() => {
                paginated(d);
              }}
            >
              {d}
            </button>
          ))}
          <button>
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
