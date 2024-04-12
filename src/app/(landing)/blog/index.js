import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { ArrowDownToLine } from "lucide-react";

export default function Blog() {
  return (
    <Container className="md:py-24 py-8">
      <div className="flex justify-between items-start mb-12 flex-wrap gap-6">
        <div className="max-w-3xl">
          <h2 className="text-5xl font-bold mb-3">In the headline</h2>
          <div className="text-supporting text-xl">
            Catch up on the most recent happenings in the world of esports. From
            tournament results to game updates, stay in the know.
          </div>
        </div>
        <Button variant="black">All news</Button>
      </div>
      <div className="flex gap-8 flex-col lg:flex-row">
        <div className="flex-1 flex flex-col gap-6">
          <img src="/images/fortnite.webp" className="flex-1" />
          <div className="space-y-2">
            <div className="font-semibold text-sm text-primary-400">
              Olivia Rhye • 20 Jan 2024
            </div>
            <h2 className="text-2xl font-semibold">
              Valorant Championship Series concludes with a stunning upset
            </h2>
            <div>
              Underdogs rise to the occasion, clinching the title from reigning
              champions.
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-8">
          {Array(2)
            .fill(0)
            .map((_, i) => (
              <div className="grid md:grid-cols-2 gap-6 min-h-52" key={i}>
                <img
                  src="/images/fortnite.webp"
                  className="mb-2 h-full object-cover"
                />
                <div className="space-y-2 flex-1">
                  <div className="font-semibold text-sm text-primary-400">
                    Olivia Rhye • 20 Jan 2024
                  </div>
                  <h2 className="text-2xl md:text-lg font-semibold">
                    Valorant Championship Series concludes with a stunning upset
                  </h2>
                  <div>
                    Underdogs rise to the occasion, clinching the title from
                    reigning champions.
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </Container>
  );
}
