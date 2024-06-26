import { getChallenges } from "@/db/server/challenges";
import ChallengesSection from "./ChallengesSection";

export const revalidate = 0;

export default async function Challenges() {
  const challenges = await getChallenges();

  return (
    <div>
      <div className="mb-8 pb-8">
        <h1 className="text-4xl font-bold">Challenges</h1>
      </div>
      <ChallengesSection challenges={challenges} />
    </div>
  );
}
