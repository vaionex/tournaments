export function formatCurrency(value, options = {}) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
    ...options,
    // minimumFractionDigits: 0,
  });
  return formatter.format(value);
}
