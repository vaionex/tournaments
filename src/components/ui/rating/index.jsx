import ReactRating from "react-rating";
import { twMerge } from "tailwind-merge";
import { Star01 } from "untitledui-js-base";

export default function Rating({ value, starClassName, ...props }) {
  return (
    <ReactRating
      initialRating={value}
      emptySymbol={
        <Star01
          className={twMerge(
            "size-4 fill-neutral-500 text-neutral-500",
            starClassName,
          )}
        />
      }
      fullSymbol={
        <Star01
          className={twMerge(
            "size-4 fill-yellow-500 text-yellow-500",
            starClassName,
          )}
        />
      }
      {...props}
    />
  );
}
