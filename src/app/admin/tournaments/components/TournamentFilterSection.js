import { CurrencyDollar } from "untitledui-js-base";
import FilterSection from "../../components/FilterSection";
import FiltersPopover from "../../components/FiltersPopover";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function TournamentFilterSection({
  filters: originalFilters = {},
  onChange,
}) {
  const [filters, setFilters] = useState(originalFilters);
  const { minimum_prize_pool, maximum_prize_pool } = filters;

  function update(value) {
    setFilters({ ...filters, ...value });
  }

  return (
    <FiltersPopover onApply={() => onChange(filters)}>
      <FilterSection
        label="Prize Pool"
        icon={CurrencyDollar}
        onReset={() => update({ minimumBalance: 0, maximumBalance: Infinity })}
      >
        <div className="flex min-w-0 items-center justify-between gap-2">
          <Input
            value={minimum_prize_pool / 100}
            onChange={(e) =>
              update({ minimum_prize_pool: Number(e.target.value) * 100 })
            }
            type="number"
            placeholder="Min"
          />
          <Input
            value={maximum_prize_pool / 100}
            onChange={(e) =>
              update({ maximum_prize_pool: Number(e.target.value) * 100 })
            }
            type="number"
            placeholder="Max"
          />
        </div>
      </FilterSection>
    </FiltersPopover>
  );
}
