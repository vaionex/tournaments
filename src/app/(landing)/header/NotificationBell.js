import { NotificationBing } from "iconsax-react";

export default function NotificationBell({ unseenCount }) {
  // Convert unseenCount to a number and handle null/undefined
  const count = Number(unseenCount) || 0;
  
  return (
    <button className="relative block">
      {count > 0 && (
        <div className="absolute right-0 top-0 size-1.5 bg-red-500" />
      )}
      <NotificationBing className="size-5" />
    </button>
  );
}
