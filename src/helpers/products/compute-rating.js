import ProductDescriptions from '../../constants/products/product-descriptions';
import logger from '../logger/logger';

const getSpecificProductFeatureListByIdea = idea => {
  return ProductDescriptions(idea).features;
};

export default product => {
  // TODO: include other features too
  let rating = 0;

  const { idea } = product;

  getSpecificProductFeatureListByIdea(idea).forEach(f => {
    const value = (product.features.offer[f.name] || 0) / f.data;
    logger.debug('computing rating for feature', f.name);

    rating += value * f.influence;
  });
  logger.debug('rating=', rating);

  return rating;
};
