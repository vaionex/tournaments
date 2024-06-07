export function formatCurrency(amountInCents, options = {}) {
  const fractional = amountInCents % 100 > 0;
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: fractional ? 2 : 0,
    ...options,
    minimumFractionDigits: fractional ? 2 : 0,
  });
  return formatter.format(amountInCents / 100);
}

export function formatValue(value) {
  const formatter = new Intl.NumberFormat("en-US", {});
  return formatter.format(value);
}
