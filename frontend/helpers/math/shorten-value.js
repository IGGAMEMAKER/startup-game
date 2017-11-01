const shortenValue = value => {
  const abs = Math.abs(value);

  if (abs < 10000) return value;

  if (abs < 1000000) return `${Math.floor(value / 1000)}K`;

  if (abs < 1000000000) return `${Math.floor(value / 100000) / 10}M`;

  return `${Math.floor(value / 100000000) / 10}B`;
};

export default shortenValue;
