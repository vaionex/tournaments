import { getUsers } from "@/db/admin/user";
import { useQuery } from "react-query";

export default function useUsers(parameters) {
  return useQuery({
    queryKey: ["admin", "users", parameters],
    queryFn: () => getUsers(parameters),
  });
}
