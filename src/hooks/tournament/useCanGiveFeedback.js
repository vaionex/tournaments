import useUser from "../auth/useUser";
import useFeedback from "./useFeedback";
import useParticipants from "./useParticipants";

export default function canGiveFeedback(id) {
  const { data: participants = [], isLoading: isLoadingPaticipants } =
    useParticipants(id);
  const { data: feedback = [], isLoading: isLoadingFeedback } = useFeedback(id);
  const { data: user, isLoading: isLoadingUser } = useUser();

  const isParticipating = participants.some(
    (participant) => participant.user_id === user.id,
  );

  const alreadySubmitted = feedback.some(
    (feedback) => feedback.user_id === user.id,
  );

  const canSubmit = isParticipating && !alreadySubmitted;

  const isLoading = isLoadingUser || isLoadingFeedback || isLoadingPaticipants;

  return { data: canSubmit, isLoading };
}
