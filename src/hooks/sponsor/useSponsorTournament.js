import { uploadAdBanner } from "@/db/sponsor";
import { api } from "@/utils/api";
import toast from "react-hot-toast";
import { useMutation } from "react-query";

export default function useSponsorTournament() {
  return useMutation({
    mutationFn: async ({ tournamentId, amount, banner: file, url }) => {
      const banner = await uploadAdBanner(file);
      await api.post("tournament/sponsor", {
        tournamentId,
        amount,
        url,
        banner,
      });
    },
    onError: (e) => toast.error(e.message || "Something went wrong"),
  });
}
