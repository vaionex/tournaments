import { CurrencyDollar } from "untitledui-js-base";
import FilterSection from "../../components/FilterSection";
import FiltersPopover from "../../components/FiltersPopover";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function UserFilterSection({
  filters: originalFilters = {},
  onChange,
}) {
  const [filters, setFilters] = useState(originalFilters);
  const { minimumBalance, maximumBalance } = filters;

  function update(value) {
    setFilters({ ...filters, ...value });
  }

  return (
    <FiltersPopover onApply={() => onChange(filters)}>
      <FilterSection
        label="Balance"
        icon={CurrencyDollar}
        onReset={() => update({ minimumBalance: 0, maximumBalance: Infinity })}
      >
        <div className="flex min-w-0 items-center justify-between gap-2">
          <Input
            value={minimumBalance}
            onChange={(e) => update({ minimumBalance: Number(e.target.value) })}
            type="number"
            placeholder="Min"
          />
          <Input
            value={maximumBalance}
            onChange={(e) => update({ maximumBalance: Number(e.target.value) })}
            type="number"
            placeholder="Max"
          />
        </div>
      </FilterSection>
    </FiltersPopover>
  );
}
