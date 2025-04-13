export const buildQuery = (query: any) => {
  const queryString =
    "?" +
    Object.entries(query)
      .map(([key, value]) => `${key}=${value}`)
      .join("&");

  return queryString;
};
