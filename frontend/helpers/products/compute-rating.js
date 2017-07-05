import ProductDescriptions from './product-descriptions';
import logger from '../logger/logger';

const getSpecificProductFeatureListByIdea = idea => {
  return ProductDescriptions(idea).features;
};

// export default (product, segmentId) => {
export default (product, segmentId) => {
  let rating = 0;

  const { idea } = product;

  const segments = ProductDescriptions(idea).segments;

  // logger.debug('computeRating', product.name, product.defaultFeatures);

  getSpecificProductFeatureListByIdea(idea).forEach((f, i) => {
    const max = product.defaultFeatures[i]; // upgradedDefaults ? upgradedDefaults[i] : f.data;

    const value = (product.features.offer[i]) / max;

    // const influence = f.influence;
    const influence = segments[segmentId].rating[i];

    rating += value * influence;
  });

  return rating;
};
