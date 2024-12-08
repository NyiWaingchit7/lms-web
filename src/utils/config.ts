interface Config {
  baseUrl: string;
}

export const config: Config = {
  baseUrl: import.meta.env.VITE_API_BASE_URL || "",
};
