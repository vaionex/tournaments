import { getUserEmail } from "@/db/admin/user";
import { useMutation } from "react-query";

export default function useGetUserEmail() {
  return useMutation({
    mutationFn: ({ id }) => getUserEmail(id),
  });
}
