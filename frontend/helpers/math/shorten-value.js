const shortenValue = value => {
  const abs = Math.abs(value);

  if (abs < 1000) return value;

  if (abs < 1000000) return `${Math.floor(value / 1000)}k`;

  if (abs < 1000000000) return `${Math.floor(value / 1000000)}M`;

  return `${Math.floor(value / 1000000000)}B`;
};

export default shortenValue;
