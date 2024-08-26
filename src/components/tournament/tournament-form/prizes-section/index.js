import { Input } from "@/components/ui/input";
import GiftCardModal from "./gift-card-modal";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X } from "untitledui-js-base";

export default function PrizesSection({
  prizes = [],
  onChange = (prizes) => {},
}) {
  const [openAddModal, setOpenAddModal] = useState(false);
  function updateTier(value, index) {
    const temp = [...prizes];
    temp[index] = { ...temp[index], ...value };
    onChange(temp);
  }
  return (
    <div>
      <table className="w-full border-separate border-spacing-y-2">
        <thead>
          <tr className="[&_th]:pb-3 [&_th]:text-left">
            <th>Position</th>
            <th>Cash</th>
            <th>XP</th>
            <th>Gift Card</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {prizes.map(({ cash = 0, xp = 0, giftCard }, index) => (
            <tr key={index}>
              <td>
                <div className="flex h-11 w-full items-center justify-center rounded-xl bg-white/10 text-center align-middle">
                  <div>{index + 1}</div>
                </div>
              </td>
              <td className="px-2">
                <Input
                  className="w-20"
                  value={Number(cash / 100).toString()}
                  type="number"
                  min="0"
                  onChange={(e) =>
                    updateTier({ cash: Number(e.target.value) * 100 }, index)
                  }
                />
              </td>
              <td>
                <Input
                  className="w-20"
                  value={Number(xp).toString()}
                  type="number"
                  min="0"
                  onChange={(e) =>
                    updateTier({ xp: Number(e.target.value) }, index)
                  }
                />
              </td>
              <td>
                {giftCard ? (
                  <div className="flex items-center justify-center gap-2">
                    {giftCard.label}
                    <button
                      type="button"
                      onClick={() => updateTier({ giftCard: undefined }, index)}
                      className="text-red-500"
                    >
                      <X />
                    </button>
                  </div>
                ) : (
                  <Button type="button" onClick={() => setOpenAddModal(true)}>
                    Add
                  </Button>
                )}
                <GiftCardModal
                  open={openAddModal}
                  setOpen={setOpenAddModal}
                  onSave={(giftCard) => {
                    updateTier({ giftCard }, index);
                    setOpenAddModal(false);
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
