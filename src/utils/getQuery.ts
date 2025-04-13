import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

export const getQuery = () => {
  const [searchParams] = useSearchParams();

  return useMemo(() => {
    const params = {} as any;
    for (const [key, value] of searchParams.entries()) {
      params[key] = value;
    }
    return params;
  }, [searchParams]);
};
