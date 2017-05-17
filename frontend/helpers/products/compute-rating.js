import ProductDescriptions from '../../constants/products/product-descriptions';
import logger from '../logger/logger';

const getSpecificProductFeatureListByIdea = idea => {
  return ProductDescriptions(idea).features;
};

export default (product, segmentId) => {
  // TODO: include other features too
  let rating = 0;

  const { idea } = product;

  const segments = ProductDescriptions(idea).segments;

  logger.debug(`segment #${segmentId}`, segments);
  getSpecificProductFeatureListByIdea(idea).forEach((f, i) => {
    const value = (product.features.offer[f.name] || 0) / f.data;

    // const influence = f.influence;
    const influence = segments[segmentId].rating[i];
    rating += value * influence;
  });

  return rating;
};
