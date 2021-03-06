import logger from '../logger/logger';
import productDescriptions from './product-descriptions';

const merge = (buyer, seller) => {
  const features = [];
  const improvements = [];

  // logger.debug('buyer is', buyer);
  // logger.debug('seller is', seller);

  productDescriptions(buyer.idea).features
    .map((f, i) => {
      const isShareableFeature = f.shareable;

      const current = buyer.features.offer[i];
      const next = seller.features.offer[i];

      features[i] = current;

      if ((current < next) && isShareableFeature) {
        improvements.push({ name: f.name, i, value: next, difference: next - current });
        features[i] = next;
      }
    });


  const sellerClients = seller.KPI.clients;
  const buyerClients = buyer.KPI.clients;
  const clients = sellerClients + buyerClients; // ? sellerClients : buyerClients;

  const result = {
    clients,
    improvements,
    features
  };

  return result;
};

export default {
  merge
}
