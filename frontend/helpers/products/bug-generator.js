import random from '../math/random';
import round from '../math/round';

export default () => {
  const cost = Math.ceil(random(0, 50));
  const penalty = round(random(0, 1));

  return {
    cost,
    platform: 'web',
    penalty
  }
};
