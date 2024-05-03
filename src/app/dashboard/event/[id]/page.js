import { permanentRedirect } from "next/navigation";

export default async function Event({ params: { id } }) {
  permanentRedirect(`/dashboard/event/${id}/overview`);
}
