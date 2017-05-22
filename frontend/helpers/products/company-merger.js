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


  const sellerClients = seller.KPI.clients;
  const buyerClients = buyer.KPI.clients;
  const clients = sellerClients > buyerClients ? sellerClients : buyerClients;

  const result = {
    clients,
    improvements,
    features
  };

  logger.debug('buy result will be', result);

  return result;
};

export default {
  merge
}
