export function currencyFormat(amount: number) {
  return `$${(amount / 100).toFixed(2)}`;
}

export function filterEmptyValues(values: object) {
  return Object.fromEntries(
    Object.entries(values).filter(
      ([_, value]) => value !== '' && value !== undefined && value !== null && value.length !== 0
    )
  );
}