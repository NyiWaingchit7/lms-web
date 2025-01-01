import { config } from "./config";

interface Props {
  url: string;
  method?: string;
  body?: any;
  header?: any;
}
export const fetchFunction = async ({ url, method = "GET", body }: Props) => {
  const response = await fetch(`${config.baseUrl}/${url}`, {
    method,
    body,
  });
  const data = await response.json();
  return { response, data };
};
