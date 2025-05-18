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
    headers: headers ? headers : await headerOptions(),
    body,
  };
  const response = await fetch(`/api/${url}`, options);
  const data = await response.json();
  return { response, data };
};
