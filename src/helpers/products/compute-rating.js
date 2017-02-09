import ProductDescriptions from '../../constants/products/product-descriptions';

const getSpecificProductFeatureListByIdea = idea => {
  return ProductDescriptions(idea).features;
};

export default product => {
  // TODO: include other features too
  let rating = 0;

  const { idea } = product;

  getSpecificProductFeatureListByIdea(idea).forEach(f => {
    const value = product.features.offer[f.name] || 0;

    rating += value * f.influence;
  });

  return rating;
};
