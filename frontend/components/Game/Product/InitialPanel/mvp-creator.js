import productActions from '../../../../actions/product-actions';
import productStore from '../../../../stores/product-store';

import logger from '../../../../helpers/logger/logger';

import Product from '../../../../classes/Product';

const getCurrentDefaultFeatures = (idea) => {
  return productStore.getCurrentMainFeatureDefaultsByIdea(idea);
};

const create = (i, basePoints, idea) => {
  logger.shit('WRITE proper randomizer in mvp-creator.js');

  const p = new Product({ idea, name: 'WWWEB HOSTING', defaultFeatures: getCurrentDefaultFeatures(idea) });

  productActions.setInitialProductSettings(i, p.features, p.KPI);

  createCompetitorCompany(idea);
  createCompetitorCompany(idea);
  createCompetitorCompany(idea);
};

const createCompetitorCompany = (idea) => {
  const p = new Product({ idea, isCompetitor: true, defaultFeatures: getCurrentDefaultFeatures(idea) });

  productActions.createCompetitorCompany(p);

  return p;
};

export default {
  create,
  createCompetitorCompany
}
