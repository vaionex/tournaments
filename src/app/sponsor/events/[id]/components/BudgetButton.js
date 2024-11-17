import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import useUser from "@/hooks/auth/useUser";

export default function BudgetButton({ value, onChange, amount }) {
  const { data: { balance = 0 } = {} } = useUser();
  const disabled = value > balance;
  return (
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild>
        <span>
          <Button
            variant={value == amount ? "green" : "secondary"}
            className="text-sm"
            onClick={() => onChange(value)}
            disabled={value > balance}
            type="button"
            asChild={!disabled}
          >
            <div>${value / 100}</div>
          </Button>
        </span>
      </TooltipTrigger>
      {disabled && <TooltipContent>Insufficient balance</TooltipContent>}
    </Tooltip>
  );
}
