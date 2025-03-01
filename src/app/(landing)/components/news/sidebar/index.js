import NewsSearch from "./search";
import TopicsList from "./topics";
import UpcomingTournaments from "./upcoming-tournaments";

export default function NewsSidebar() {
  return (
    <aside className="sticky top-24 h-fit w-80 space-y-8">
      <NewsSearch />
      <TopicsList />
      <UpcomingTournaments />
    </aside>
  );
}