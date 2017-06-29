const standard = (value, range) => {
  const green = Math.floor(value * 160 / range);
  const red = 255 - Math.floor(value * 255 / range);

  return `rgba(${red}, ${green}, 0, 1)`;//`rgba(${red}, ${green}, 0, 1)`;
};

const ranged = (value, min, max) => {
  return standard(value - min, max - min);
};

export default {
  standard,
  ranged
}
