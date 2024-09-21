import { getPayouts } from "@/db/payouts";
import { format } from "date-fns";
import { useQuery } from "react-query";

export default function usePayouts({ start, end } = {}) {
  return useQuery({
    queryKey: [
      "payouts",
      {
        start: start && format(start, "dd MMM yyyy"),
        end: end && format(end, "dd MMM yyyy"),
      },
    ],
    queryFn: () => getPayouts({ start, end }),
  });
}
