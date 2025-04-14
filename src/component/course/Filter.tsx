import { Category } from "@/type/category";
import { FilterKeysType } from "@/type/course";

interface Props {
  clearFilter: () => void;
  types: any[];
  category: Category[];
  filterKeys: FilterKeysType;
  setFilterKeys: (data?: any) => void;
  selectCategory: (data: number) => void;
}
export const CourseFilter = ({
  category,
  clearFilter,
  types,
  filterKeys,
  setFilterKeys,
  selectCategory,
}: Props) => {
  return (
    <div className="w-full lg:border border-slate-200 rounded-lg pt-5 pb-10 h-fit lg:sticky top-[90px] px-3 space-y-5">
      <div className="flex justify-between items-center">
        <h4 className="text-xl font-semibold">Filters</h4>
        <h4
          onClick={clearFilter}
          className="  cursor-pointer py-1 text-xs px-3 bg-red text-white rounded-md duration-300 hover:opacity-80"
        >
          Clear <i className="fa-solid fa-trash-can text-xs ps-1"></i>
        </h4>
      </div>
      <div>
        {/* <h5 className="font-medium text-base mb-3">Categories</h5> */}
        <div className="flex gap-2">
          {types.map((type) => (
            <div
              key={type.name}
              className={`px-5 py-1 border border-green rounded-full cursor-pointer ${
                type.value === filterKeys.isPremium ? "bg-green text-white" : ""
              }`}
              onClick={() =>
                filterKeys.isPremium !== type.value &&
                setFilterKeys({
                  ...filterKeys,
                  page: "1",
                  isPremium: type.value,
                })
              }
            >
              <small> {type.name}</small>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h5 className="font-medium text-base mb-3">Categories</h5>
        <div className="flex flex-wrap gap-2">
          {category.map((item) => (
            <div
              key={item.id}
              className={`px-3 py-1 border border-green rounded-full cursor-pointer ${
                filterKeys.categories.includes(item.id as number)
                  ? "bg-green text-white "
                  : ""
              }`}
              onClick={() => {
                selectCategory(Number(item.id));
              }}
            >
              <small> {item.name} </small>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
