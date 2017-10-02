import productActions from '../../../../actions/product-actions';
import productStore from '../../../../stores/product-store';

import logger from '../../../../helpers/logger/logger';

import Product from '../../../../classes/Product';

const create = (i, basePoints, idea) => {
  logger.shit('WRITE proper randomizer in mvp-creator.js');

  let p = new Product({ idea, name: 'WWWEB HOSTING' });

  productActions.setInitialProductSettings(i, p.features);

  createCompetitorCompany(idea);
  createCompetitorCompany(idea);
  createCompetitorCompany(idea);
};

const createCompetitorCompany = (idea) => {
  let p = new Product({ idea, isCompetitor: true });

  productActions.createCompetitorCompany(p);

  return p;
};

export default {
  create,
  createCompetitorCompany
}
