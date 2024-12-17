import Container from "@/components/ui/container";
import Loader from "@/components/ui/loader";

export default function Loading() {
  return (
    <Container className="flex min-h-[50vh] items-center justify-center">
      <Loader className="h-8 w-8" />
    </Container>
  );
}