import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Rating from "@/components/ui/rating";
import useCanGiveFeedback from "@/hooks/tournament/useCanGiveFeedback";
import useSubmitFeedback from "@/hooks/tournament/useSubmitFeedback";
import { useState } from "react";
import toast from "react-hot-toast";

export default function SubmitFeedback({ id }) {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(5);
  const { mutate: submit, isLoading } = useSubmitFeedback();

  const { data: canSubmit } = useCanGiveFeedback(id);

  if (!canSubmit) return null;

  return (
    <div className="mt-5 space-y-4">
      <div className="flex items-center gap-2">
        <div>Rating: </div>
        <Rating value={rating} onChange={(v) => setRating(v)} />
      </div>
      <Input value={review} onChange={(e) => setReview(e.target.value)} />
      <div className="flex justify-end">
        <Button
          onClick={() =>
            submit(
              {
                id,
                review,
                rating,
              },
              {
                onSuccess: () => {
                  setReview("");
                  setRating(5);
                  toast.success("Feedback submitted");
                },
              },
            )
          }
          loading={isLoading}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}
