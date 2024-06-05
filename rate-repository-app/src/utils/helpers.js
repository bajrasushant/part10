export const formatCounts = (count) => {
  if (count < 1000) return count;
  const digit = count / 1000;
  const frontDigit = Math.floor(digit);
  const afterDecimal = Math.round((digit % 1) * 10);
  if (afterDecimal === 0) {
    return frontDigit + "k";
  }
  return `${frontDigit}.${afterDecimal}k`;
};
