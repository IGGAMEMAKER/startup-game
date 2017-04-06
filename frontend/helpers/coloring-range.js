export default {
  standard: (value, range) => {
    const green = Math.floor(value * 160 / range);
    const red = 255 - Math.floor(value * 255 / range);

    return `rgba(${red}, ${green}, 0, 1)`;//`rgba(${red}, ${green}, 0, 1)`;
  }
}
