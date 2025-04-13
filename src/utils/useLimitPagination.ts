import { useMemo } from "react";

export const useLimitedPaginations = (total: number, curr: number) => {
  return useMemo(() => {
    const result = [];

    if (total <= 5) {
      for (let i = 1; i <= total; i++) {
        result.push(i);
      }
    } else {
      if (curr < 5) {
        result.push(1, 2, 3, 4, 5, "...", total - 1, total);
      } else if (curr > total - 2) {
        result.push(1, 2, "...", total - 2, total - 1, total);
      } else {
        result.push(1, 2, "...", curr - 1, curr, curr + 1, "...", total);
      }
    }

    return result;
  }, [total, curr]);
};
