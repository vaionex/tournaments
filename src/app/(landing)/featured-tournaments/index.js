import CornerBorder from "@/components/ui/corner-border";
import { Button } from "@/components/ui/button";
import DurationTag from "@/components/ui/duration-tag";
import Container from "@/components/ui/container";

export default function FeaturedTournaments() {
  return (
    <div>
      <Container>
        <div className="flex justify-between items-start mb-10 flex-wrap gap-6">
          <div>
            <h2 className="text-5xl font-bold mb-3">Featured Tournaments</h2>
            <div className="text-supporting text-xl">
              Join the fray in your favorite game and claim glory!
            </div>
          </div>
          <Button variant="black">All Tournaments</Button>
        </div>
        <CornerBorder>
          <div
            style={{ backgroundImage: "url(/images/fortnite.webp)" }}
            className="bg-cover bg-center"
          >
            <div className="bg-gradient-to-t from-black to-30% px-8 py-12 flex flex-col justify-between h-[30rem]">
              <DurationTag startDate={new Date()} endDate={new Date()} />
              <div>
                <h2 className="text-3xl font-bold">
                  Fortnite 2024 – $30K Prize Pool Battle Royale!
                </h2>
                <div className="text-supporting">
                  Outlast the Legends to Win $20K + Legendary Skins!
                </div>
              </div>
            </div>
          </div>
        </CornerBorder>
      </Container>

      <div className="bg-gradient-to-r from-transparent via-white to bg-transparent w-full h-0.5 mt-20" />
    </div>
  );
}
