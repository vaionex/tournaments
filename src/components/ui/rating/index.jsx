import ReactRating from "react-rating";
import { Star01 } from "untitledui-js-base";

export default function Rating({ value, ...props }) {
  return (
    <ReactRating
      initialRating={value}
      emptySymbol={
        <Star01 className="size-4 fill-neutral-500 text-neutral-500" />
      }
      fullSymbol={<Star01 className="size-4 fill-yellow-500 text-yellow-500" />}
      {...props}
    />
  );
}
