import { CurrencyDollar, GamingPad02 } from "untitledui-js-base";
import FilterSection from "../../components/FilterSection";
import FiltersPopover from "../../components/FiltersPopover";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Select from "@/components/ui/select";

export default function TournamentFilterSection({
  filters: originalFilters = {},
  onChange,
}) {
  const [filters, setFilters] = useState(originalFilters);
  const { minimum_prize_pool, maximum_prize_pool, status = "All" } = filters;

  function update(value) {
    setFilters({ ...filters, ...value });
  }

  return (
    <FiltersPopover onApply={() => onChange(filters)}>
      <FilterSection
        label="Status"
        icon={GamingPad02}
        onReset={() => update({ status: undefined })}
      >
        <div className="flex min-w-0 items-center justify-between gap-2">
          <Select
            items={[
              {
                label: "All",
                value: "All",
              },
              {
                label: "Upcoming",
                value: "Upcoming",
              },
              {
                label: "Waiting for payout",
                value: "Waiting for payout",
              },
              {
                label: "Completed",
                value: "Completed",
              },
            ]}
            value={status}
            onChange={(status) => update({ status })}
          />
        </div>
      </FilterSection>
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
