interface Config {
  baseUrl: string;
  secretKey: string;
  apiId: string;
  backendUrl: string;
}
export const config: Config = {
  baseUrl: import.meta.env.VITE_API_BASE_URL || "",
  secretKey: import.meta.env.VITE_API_SECERE_KEY || "",
  apiId: import.meta.env.VITE_API_ID || "",
  backendUrl: import.meta.env.VITE_BACKEN_URL || "",
};
