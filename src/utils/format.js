export function formatCurrency(value, options = {}) {
  const fractional = (value * 100) % 100 > 0;
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: fractional ? 2 : 0,
    ...options,
    minimumFractionDigits: fractional ? 2 : 0,
  });
  return formatter.format(value);
}

export function formatValue(value) {
  const formatter = new Intl.NumberFormat("en-US", {});
  return formatter.format(value);
}
