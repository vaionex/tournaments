import BronzeBorder from "./Bronze";
import DiamondBorder from "./Diamond";
import GoldBorder from "./Gold";
import GrandmasterBorder from "./Grandmaster";
import MasterBorder from "./Master";
import PlatinumBorder from "./Platinum";
import SilverBorder from "./Silver";

const Borders = {
  Bronze: BronzeBorder,
  Silver: SilverBorder,
  Gold: GoldBorder,
  Platinum: PlatinumBorder,
  Diamond: DiamondBorder,
  Master: MasterBorder,
  Grandmaster: GrandmasterBorder,
};

export default function Border({ rank, ...props }) {
  const Comp = Borders[rank] ?? (() => null);
  return <Comp {...props} />;
}
