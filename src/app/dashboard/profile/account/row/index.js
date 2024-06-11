export default function Row({ children }) {
  return (
    <div className="flex max-w-2xl items-start gap-10 [&_>_div:first-child]:w-64 [&_>_div:first-child]:text-sm [&_>_div:nth-child(2)]:w-96">
      {children}
    </div>
  );
}
