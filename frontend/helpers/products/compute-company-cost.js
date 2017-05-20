import productDescriptions from '../../constants/products/product-descriptions';
import logger from '../logger/logger';

import random from '../math/random';

const compute = (c) => {
  let cost = 10000;

  const featureCost = 1500;

  logger.debug('computeCompanyCost', c);

  const defaults = productDescriptions(c.idea);
  const defaultFeatures = defaults.features;

  // sum technology part
  const offer = {};
  logger.shit(`each feature has it's own cost. Servers are more expensive`);
  defaultFeatures.forEach(f => {
    // offer[f.name] = Math.floor(luck * f.data);
    cost += c.features.offer[f.name] * featureCost;
  });

  // customers also influence cost
  cost += c.KPI.clients * defaults.CAC * 1.5;


  return cost;
};

export default {
  compute
}
