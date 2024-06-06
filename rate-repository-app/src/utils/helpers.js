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

export const formatDate = (dateString) => {
  const parseDate = new Date(dateString);
  if (isNaN(parseDate.getTime())) {
    return dateString;
  }
  const year = parseDate.getFullYear();
  const month = String(parseDate.getMonth() + 1).padStart(2, "0");
  const day = String(parseDate.getDate()).padStart(2, "0");
  return `${day}.${month}.${year}`;
};
