import { config } from "./config";
import { headerOptions } from "./headerOption";

interface Props {
  url: string;
  method?: string;
  body?: any;
  headers?: any;
}
export const fetchFunction = async ({
  url,
  method = "GET",
  body,
  headers,
}: Props) => {
  const options = {
    method,
    headers: headers ? headers : headerOptions(),
    body,
  };
  const response = await fetch(`${config.baseUrl}/${url}`, options);
  const data = await response.json();
  return { response, data };
};
