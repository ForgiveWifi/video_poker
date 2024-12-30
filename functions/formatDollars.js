export default function formatDollars(cents, showCents = false) {
  if (showCents) return `$${(cents / 100).toFixed(2)}`;
  else if (cents < 100) {
    return `${cents}¢`;
  } else {
    const dollars = (cents / 100).toFixed(2);
    if (dollars.endsWith('.00')) {
      return `$${parseInt(dollars).toLocaleString()}`;
    }
    return `$${parseFloat(dollars).toLocaleString()}`;
  }
}