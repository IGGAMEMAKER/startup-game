import productDescriptions from './product-descriptions';
import logger from '../logger/logger';

const structured = (c) => {
  // logger.debug('compute cost of company', c);
  const defaults = productDescriptions(c.idea);
  const defaultFeatures = defaults.features;

  // sum technology part
  logger.shit(`each feature has it's own cost. Servers are more expensive`);

  let totalXP = 0;

  let featureSum = 0;
  defaultFeatures.forEach((f, featureId) => {
    const xp = c.features.offer[featureId];

    totalXP += xp;
    featureSum += xp * f.development;
  });

  featureSum *= 50; // 1 PP costs 50$ + 30% for working product

  // complexity modifier
  const complexityModifier = Math.pow(1.01, totalXP / 1000);

  const technologyValue = Math.ceil(featureSum * complexityModifier / 1000);

  // customers also influence cost
  const clientValue = Math.ceil(c.KPI.clients * defaults.CAC * 80);

  const cost = 10000 + technologyValue + clientValue;

  const technologyPart = Math.floor(technologyValue * 100 / cost);
  const clientPart = Math.floor(clientValue * 100 / cost);

  return {
    cost,
    complexityModifier,
    clientPart,
    technologyPart,
    clientValue,
    technologyValue,
  };
};

const compute = (c) => {
  return structured(c).cost;
};

export default {
  compute,
  structured
}
