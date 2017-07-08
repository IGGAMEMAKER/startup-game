export const isLastDayOfMonth = day => {
  return day % 30 === 0;
};

export const isLastDayOfYear = day => {
  return day % 360 === 0;
};

