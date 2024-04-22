import { supabase } from "@/supabase/client";
import { useRouter } from "next/navigation";
import { useQueryClient } from "react-query";

export default function useLogout() {
  const { push } = useRouter();
  const queryClient = useQueryClient();

  async function logout() {
    await supabase.auth.signOut();
    await queryClient.clear();
    await push("/login");
  }

  return logout;
}
