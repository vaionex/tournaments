import { sendTournamentChatMessage } from "@/db/tournament";
import { useMutation } from "react-query";

export default function useSendTournamentChatMessage() {
  return useMutation({
    mutationFn: ({ id, message }) => sendTournamentChatMessage(id, message),
  });
}
