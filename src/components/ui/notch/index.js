import { twMerge } from "tailwind-merge";

export default function Notch({ className, children, ...rest }) {
  return (
    <div className={twMerge("relative", className)}>
      {children}
      <svg
        width="26"
        height="12"
        viewBox="0 0 26 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute bottom-0 right-0"
      >
        <path d="M0 27.2L26 0.199951V27.2H0Z" fill="#004EEB" />
      </svg>
    </div>
  );
}
