import random from '../math/random';
import round from '../math/round';

export default (platforms, tests, bonuses) => {
  const cost = Math.ceil(random(0, 50));

  const value = Math.ceil(random(0, 1000));
  let penalty;

  if (value < 10) {
    penalty = 0.5;
  } else if (value < 10 + 40) {
    penalty = 0.25;
  } else if (value < 10 + 40 + 150) {
    penalty = 0.1;
  } else if (value < 10 + 40 + 150 + 300) {
    penalty = 0.03;
  } else {
    penalty = 0.01;
  }

  return {
    cost,
    platform: 'web',
    penalty
  }
};
