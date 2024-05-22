import { NotificationBing } from "iconsax-react";

export default function NotificationBell({ unseenCount = 0 }) {
  return (
    <button className="relative block">
      {unseenCount > 0 && (
        <div className="absolute right-0 top-0 size-1.5 bg-red-500" />
      )}
      <NotificationBing className="size-5" />
    </button>
  );
}
