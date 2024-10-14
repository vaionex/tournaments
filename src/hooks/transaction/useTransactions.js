import { getTransactions } from "@/db/transaction";
import { format } from "date-fns";
import { useQuery } from "react-query";

export default function useTransactions({
  start = new Date(0),
  end = new Date(),
} = {}) {
  return useQuery({
    queryKey: [
      "transactions",
      {
        start: start && format(start, "dd MMM yyyy"),
        end: end && format(end, "dd MMM yyyy"),
      },
    ],
    queryFn: () => getTransactions({ start, end }),
  });
}
