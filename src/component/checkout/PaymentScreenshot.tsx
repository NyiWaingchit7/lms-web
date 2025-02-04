import { config } from "@/utils/config";
import { generateToken } from "@/utils/headerOption";
import { useState } from "react";
import toast from "react-hot-toast";

interface Props {
  onChange: (data?: any) => void;
}

export const PaymentScreenShot = ({ onChange }: Props) => {
  const [image, setImage] = useState("");
  const accessToken = localStorage.getItem("token");

  const handleImageUpload = async (e: any) => {
    const apitoken = await generateToken();
    const formData = new FormData();
    formData.append("files", e.target.files[0]);
    const response = await fetch(`${config.baseUrl}/file-upload`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        API_TOKEN: `Bearer ${apitoken}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      data.message && toast.error(data.message);
    } else {
      setImage(data.imgUrl);
      onChange(data.imgUrl);
    }
  };
  return (
    <div className="">
      <div className="w-full h-[300px] bg-black/5 flex justify-center items-center rounded-md">
        {image ? (
          <img
            src={image}
            className="w-auto h-full p-5 object-cover"
            alt="data"
          />
        ) : (
          <p className="text-body">!No image selected</p>
        )}
      </div>
      <div className="flex justify-center mt-5">
        <label className="px-4 py-2 border border-green text-xs sm:text-sm  rounded-3xl cursor-pointer hover:bg-black/5 transition-all duration-300 ease-in">
          <input type="file" className="hidden" onChange={handleImageUpload} />
          {image ? "Change" : "Select"} your payment screenshot
        </label>
      </div>
    </div>
  );
};
