import productDescriptions from './product-descriptions';
import logger from '../logger/logger';

import random from '../math/random';

const compute = (c) => {
  let cost = 10000;

  const featureCost = 15;

  // logger.debug('computeCompanyCost', c);

  const defaults = productDescriptions(c.idea);
  const defaultFeatures = defaults.features;

  // sum technology part
  logger.shit(`each feature has it's own cost. Servers are more expensive`);

  let totalXP = 0;

  let featureSum = 0;
  defaultFeatures.forEach(f => {
    const xp = c.features.offer[f.name];

    totalXP += xp / 1000;
    featureSum += xp * featureCost;
  });

  // complexity modifier
  const complexityModifier = Math.pow(1.01, totalXP);
  cost += featureSum * complexityModifier;

  // customers also influence cost
  cost += c.KPI.clients * defaults.CAC * 1.5;


  // return Math.ceil(cost);
  return 1;
};

export default {
  compute
}
