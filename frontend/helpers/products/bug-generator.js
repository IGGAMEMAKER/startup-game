import random from '../math/random';
import round from '../math/round';

export default (platforms, featureCost = 10, tests, bonuses) => {
  const complexity = random(0.1, 1.5);
  const importance = Math.ceil(random(0, 1000));

  let penalty;

  if (importance < 10) {
    penalty = 0.5;
  } else if (importance < 10 + 40) {
    penalty = 0.25;
  } else if (importance < 10 + 40 + 150) {
    penalty = 0.1;
  } else if (importance < 10 + 40 + 150 + 300) {
    penalty = 0.03;
  } else {
    penalty = 0.01;
  }

  // const cost = Math.ceil(penalty * 100 * Math.pow(2, complexity));
  const cost = Math.ceil((1 + penalty) * Math.pow(featureCost, complexity));

  return {
    cost,
    platform: 'web',
    penalty
  }
};
