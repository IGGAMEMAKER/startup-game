import ProductDescriptions from './product-descriptions';
import logger from '../logger/logger';

const getSpecificProductFeatureListByIdea = idea => {
  return ProductDescriptions(idea).features;
};

export default (product, segmentId) => {
  // TODO: include other features too
  let rating = 0;

  const { idea } = product;

  const segments = ProductDescriptions(idea).segments;

  getSpecificProductFeatureListByIdea(idea).forEach((f, i) => {
    const max = product.defaultFeatures[i]; // upgradedDefaults ? upgradedDefaults[i] : f.data;

    const value = (product.features.offer[i]) / max;

    // const influence = f.influence;
    const influence = segments[segmentId].rating[i];

    rating += value * influence;
  });

  return rating;
};
