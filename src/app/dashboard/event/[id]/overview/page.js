import Image from "next/image";

// Replace img tags with Image component
<Image 
  src={banner || "/images/default-banner.jpg"} 
  alt={name || "Tournament banner"}
  width={1200}
  height={630}
  className="rounded-md object-cover"
/>