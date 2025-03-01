"use client";

import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

const deals = [
  {
    product: "Logitech G Pro X Superlight",
    prices: [
      { store: "Amazon", price: 149.99 },
      { store: "Best Buy", price: 159.99 },
      { store: "Newegg", price: 154.99 }
    ]
  },
  {
    product: "SteelSeries Arctis Nova Pro",
    prices: [
      { store: "Amazon", price: 349.99 },
      { store: "Best Buy", price: 349.99 },
      { store: "Newegg", price: 359.99 }
    ]
  }
];

export default function PriceComparison() {
  return (
    <section className="rounded-xl border border-neutral-800 bg-neutral-900 p-6">
      <h2 className="mb-6 text-xl font-bold">Price Comparison</h2>
      <div className="space-y-6">
        {deals.map((deal) => (
          <div key={deal.product}>
            <h3 className="mb-3 font-semibold text-white">{deal.product}</h3>
            <div className="space-y-2">
              {deal.prices.map((price) => (
                <div
                  key={price.store}
                  className="flex items-center justify-between rounded-lg border border-neutral-800 p-3"
                >
                  <span className="text-neutral-400">{price.store}</span>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-primary">
                      ${price.price}
                    </span>
                    <Button size="sm" variant="secondary">
                      <ArrowUpRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}