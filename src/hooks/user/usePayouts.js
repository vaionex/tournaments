import { getPayouts } from "@/db/payouts";
import { useQuery } from "react-query";

export default function usePayouts() {
  return useQuery({
    queryKey: ["payouts"],
    queryFn: () => getPayouts(),
  });
}
