import useParticipations from "../user/useParticipations";

export default function useIsParticipant(id) {
  const query = useParticipations();
  const { data: participations = [] } = query;
  const isParticipant = participations.some(
    ({ tournament_id }) => id == tournament_id,
  );

  return { ...query, data: isParticipant };
}
