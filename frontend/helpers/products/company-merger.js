import logger from '../logger/logger';
import productDescriptions from './product-descriptions';

const merge = (buyer, seller) => {
  const features = {};
  const improvements = [];

  // logger.debug('buyer is', buyer);
  // logger.debug('seller is', seller);

  productDescriptions(buyer.idea).features
    .map((f, i) => {
      const current = buyer.features.offer[f.name];
      const next = seller.features.offer[f.name];

      if (current < next) {
        improvements.push({ name: f.name, i, value: next, difference: next - current });
        features[f.name] = next;
      } else {
        features[f.name] = current;
      }
    });

  // logger.debug({ improvements, features });

  return {
    clients: buyer.KPI.clients,
    improvements,
    features,
  }
};

export default {
  merge
}
