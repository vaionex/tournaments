export default function Avatar({
  src = "/images/profile-picture-placeholder.jpg",
}) {
  return <img src={src} className="size-8" alt="Avatar" />;
}
