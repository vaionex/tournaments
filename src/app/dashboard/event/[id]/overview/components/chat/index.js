"use client";

import useParticipants from "@/hooks/tournament/useParticipants";
import useTournamentChat from "@/hooks/tournament/useTournamentChat";
import TournamentChatMessage from "./Message";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import useSendTournamentChatMessage from "@/hooks/tournament/useSendTournamentChatMessage";
import Loader from "@/components/ui/loader";
import ChatContainer from "./ChatContainer";
import useIsParticipant from "@/hooks/tournament/useIsParticipant";

export default function TournamentChat({ id }) {
  const [message, setMessage] = useState("");

  const { data: chat = [], isLoading: isLoadingChat } = useTournamentChat(id);
  const { isLoading: isLoadingParticipants } = useParticipants(id);
  const { data: isParticipant } = useIsParticipant(id);
  const { mutate: send, isLoading: isLoadingSend } =
    useSendTournamentChatMessage();

  const emptyMessage = message.trim() == "";
  function handleSend() {
    if (emptyMessage) return;
    send({ id, message });
    setMessage("");
  }

  const isLoading = isLoadingChat || isLoadingParticipants;

  if (!isParticipant) return null;

  return (
    <div className="w-80 flex-grow-0 border-l border-inherit">
      <ChatContainer>
        {isLoading && (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <Loader className="text-white/40" />
          </div>
        )}
        {chat.length == 0 && !isLoading && (
          <div className="mt-8 text-center opacity-50">
            <div>No Messages Yet</div>
            <div>Send the first message to kickstart the discussion</div>
          </div>
        )}
        {chat.map((chat) => (
          <TournamentChatMessage {...chat} tournamentId={id} key={chat.id} />
        ))}
      </ChatContainer>
      <div className="relative m-4 mt-8 rounded-xl border border-inherit p-4">
        <textarea
          className="w-full resize-none bg-transparent text-sm outline-none placeholder:text-neutral-500 focus:outline-none"
          placeholder="Send a message"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key == "Enter") {
              e.preventDefault();
              handleSend();
            }
          }}
        />
        <Button
          className="ml-auto block"
          onClick={handleSend}
          loading={isLoadingSend}
          disabled={emptyMessage}
        >
          Send
        </Button>
      </div>
    </div>
  );
}
