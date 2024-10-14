import Container from "@/components/ui/container";

export default function MarkdownLayout({ children }) {
  return (
    <Container className="mx-auto py-32">
      <div className="prose prose-invert mx-auto">{children}</div>
    </Container>
  );
}
