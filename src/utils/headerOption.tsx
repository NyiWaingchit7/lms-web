export const headerOptions = () => {
  const accessToken = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${accessToken}`,
    "content-type": "application/json",
    accept: "application/json",
  };
};
