import { config } from "./config";
import { generateToken } from "./headerOption";

export const imageUpload = async (file: any) => {
  const accessToken = localStorage.getItem("token");

  const apitoken = await generateToken();
  const formData = new FormData();
  formData.append("files", file);
  const response = await fetch(`${config.baseUrl}/file-upload`, {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      API_TOKEN: `Bearer ${apitoken}`,
    },
  });
  const data = await response.json();
  return { response, data };
};
