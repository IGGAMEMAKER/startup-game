import productActions from '../../../../actions/product-actions';
import productStore from '../../../../stores/product-store';

import logger from '../../../../helpers/logger/logger';

import Product from '../../../../classes/Product';

const getCurrentDefaultFeatures = (idea) => {
  const value = productStore.getCurrentMainFeatureDefaultsByIdea(idea);

  // logger.debug('getCurrentDefaultFeatures in mvp-creator.js', value);
  return value;
};

const create = (i, basePoints, idea) => {
  // const points = productStore.getPoints();
  //
  // // basePoints must be an array
  // logger.shit('WRITE proper basePoints array in mvp-creator.js');
  // basePoints = [
  //   { name: 'programming', amount: 100 },
  //   { name: 'marketing', amount: 100 }
  // ];
  //
  // let hasEnoughPoints = true;
  // basePoints.forEach(p => {
  //   if (points[p.name] < p.amount) hasEnoughPoints = false;
  // });
  //
  // if (hasEnoughPoints) {
  // we can make prototype
  logger.shit('WRITE proper randomizer in mvp-creator.js');

  const p = new Product({ idea, name: 'WWWEB HOSTING', defaultFeatures: getCurrentDefaultFeatures(idea) });

  // productActions.spendPoints(basePoints[1].amount, basePoints[0].amount);
  productActions.setInitialProductSettings(i, p.features, p.KPI);

  createCompetitorCompany(idea);
  createCompetitorCompany(idea);
  createCompetitorCompany(idea);
  // }
};

const createCompetitorCompany = (idea) => {
  const p = new Product({ idea, isCompetitor: true, defaultFeatures: getCurrentDefaultFeatures(idea) });

  logger.debug('createCompetitorCompany', p);
  productActions.createCompetitorCompany(p);

  return p;
};

export default {
  create,
  createCompetitorCompany
}
