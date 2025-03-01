import Container from "@/components/ui/container";
import FeaturedStory from "./featured-story";

export default function NewsHero() {
  return (
    <div 
      className="relative h-[70vh] min-h-[600px] w-full bg-cover bg-center" 
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.8)), url('/images/landing/hero-bg.webp')`
      }}
    >
      <Container className="flex h-full items-end pb-16">
        <FeaturedStory />
      </Container>
    </div>
  );
}