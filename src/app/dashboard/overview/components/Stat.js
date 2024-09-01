import { twMerge } from "tailwind-merge";
import Card from "../../components/Card";

export default function Stat({
  title,
  icon = null,
  children,
  className = "",
  ...props
}) {
  return (
    <Card className={twMerge("", className)} {...props}>
      <div className="mb-5 flex items-center gap-2">
        {icon}
        <div className="text-xl font-medium text-neutral-300">{title}</div>
      </div>
      <div>{children}</div>
    </Card>
  );
}
