import useAuthentication from "./useAuthentication";
import useUser from "./useUser";

export default function useAdmin() {
  const { data: user, isLoading } = useUser();

  const isAdmin = user.admin;
  const status =
    isLoading || !user.id ? "loading" : isAdmin ? "admin" : "not-admin";

  return {
    status,
    isLoading: status == "loading",
    isAdmin: status == "admin",
    isNotAdmin: status == "not-admin",
  };
}
