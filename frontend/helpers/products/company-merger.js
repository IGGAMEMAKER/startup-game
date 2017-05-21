import logger from '../logger/logger';
import productDescriptions from './product-descriptions';

const merge = (buyer, seller) => {
  logger.debug('buyer is', buyer);

  productDescriptions(buyer.idea)

  return {
    clients: buyer.KPI.clients,
    features: buyer.features
  }
};

export default {
  merge
}
