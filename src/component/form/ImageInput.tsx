import { imageUpload } from "@/utils/fileUpload";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Props {
  onChange: (data?: any) => void;
  value?: string;
}

export const ImageInput = ({ onChange, value }: Props) => {
  const [image, setImage] = useState("");

  const handleImageUpload = async (e: any) => {
    const { response, data } = await imageUpload(e.target.files[0]);
    if (!response.ok) {
      data.message && toast.error(data.message);
    } else {
      setImage(data.imgUrl);
      onChange(data.imgUrl);
    }
  };
  useEffect(() => {
    if (value) {
      setImage(value);
    }
  }, [value]);
  return (
    <div className="w-full h-[100px] bg-black/5 flex justify-between items-center rounded-md px-5">
      <div className="">
        <img
          src={image || "/default.jpg"}
          className="w-20 h-20 rounded-full object-cover"
          alt="data"
        />
      </div>
      <div className="flex justify-center mt-5">
        <label className="px-4 py-2 border border-green text-xs sm:text-sm  rounded-3xl cursor-pointer hover:bg-black/5 transition-all duration-300 ease-in">
          <input type="file" className="hidden" onChange={handleImageUpload} />
          Change profile
        </label>
      </div>
    </div>
  );
};
