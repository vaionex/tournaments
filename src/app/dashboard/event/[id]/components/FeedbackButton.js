"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Modal from "@/components/ui/modal";
import Rating from "@/components/ui/rating";
import useCanGiveFeedback from "@/hooks/tournament/useCanGiveFeedback";
import useSubmitFeedback from "@/hooks/tournament/useSubmitFeedback";
import useTournament from "@/hooks/tournament/useTournament";
import { useState } from "react";

export default function FeedbackButton({ tournamentId }) {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const { data: { banner, name } = {} } = useTournament(tournamentId);
  const { mutate: submitFeedback, isLoading } = useSubmitFeedback();
  const { data: canSubmit } = useCanGiveFeedback(tournamentId);
  if (!canSubmit) return null;
  return (
    <>
      <Button onClick={() => setOpen(true)} variant="green">
        Feedback
      </Button>
      <Modal
        className="max-w-sm space-y-8 rounded border border-white/20 bg-black p-4 text-center"
        {...{ open, setOpen }}
      >
        <div className="flex gap-3 rounded-xl bg-white/10 p-2.5">
          <img
            src={banner}
            className="aspect-video w-16 overflow-hidden rounded-lg object-cover"
          />
          <div className="flex-1 text-left text-sm">{name}</div>
        </div>
        <div>
          <h2 className="text-lg font-semibold">How was your experience?</h2>
          <div className="text-neutral-400">
            Rate your experience in this tournament to help us improve! Your
            feedback makes future events even better.
          </div>
        </div>
        <Rating value={rating} onChange={setRating} starClassName="size-10" />
        <Input
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Feedback (optional)"
        />
        <Button
          variant="green"
          className="w-full"
          disabled={!rating}
          loading={isLoading}
          onClick={() =>
            submitFeedback(
              { id: tournamentId, review, rating },
              { onSuccess: () => setOpen(false) },
            )
          }
        >
          Submit
        </Button>
      </Modal>
    </>
  );
}
