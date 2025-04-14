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
  const current = Number(page);

  return (
    <div className="mt-5">
      {paginations ? (
        <div className="flex gap-3">
          <button
            onClick={() => {
              current > 1 && paginated(current - 1);
            }}
          >
            <i className="fa-solid fa-angle-left"></i>
          </button>
          {data.map((d, i) => (
            <button
              key={i}
              className={`px-3 py-1 rounded-md text-sm ${
                current == d ? "bg-green text-white " : ""
              }`}
              onClick={() => {
                paginated(d);
              }}
            >
              {d}
            </button>
          ))}
          <button
            onClick={() => {
              paginations > current && paginated(current + 1);
            }}
          >
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
