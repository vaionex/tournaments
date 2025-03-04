import NewsSearch from "./search";
import TopicsList from "./topics";
import UpcomingTournaments from "./upcoming-tournaments";

export default function NewsSidebar() {
  return (
    <aside className="sticky top-24 w-full space-y-8">
      <NewsSearch />
      <TopicsList />
      <UpcomingTournaments />
    </aside>
  );
}