import { useSearchParams } from "next/navigation";

export default function HeaderMessage() {
  const searchParams = useSearchParams();
  const message = searchParams.get("message");

  if (!message) return;
  return (
    <div className="bg-primary py-1 text-center text-white">{message}</div>
  );
}
