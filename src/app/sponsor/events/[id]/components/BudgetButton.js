import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import useUser from "@/hooks/auth/useUser";

export default function BudgetButton({ value, onChange, amount }) {
  const { data: userData, isLoading } = useUser();
  
  if (!userData) {
    return null;
  }

  const balance = userData.balance ?? 0;
  const disabled = value > balance;

  return (
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild>
        <span>
          <Button
            variant={value == amount ? "green" : "secondary"}
            className="text-sm"
            onClick={() => onChange(value)}
            disabled={disabled}
            type="button"
            loading={isLoading}
          >
            ${value / 100}
          </Button>
        </span>
      </TooltipTrigger>
      {disabled && <TooltipContent>Insufficient balance</TooltipContent>}
    </Tooltip>
  );
}
