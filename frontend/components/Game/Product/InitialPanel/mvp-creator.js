import productActions from '../../../../actions/product-actions';
import playerActions from '../../../../actions/player-actions';
import playerStore from '../../../../stores/player-store';

import logger from '../../../../helpers/logger/logger';

import productGenerator from '../../../../helpers/products/product-generator';

export default {
  create: (i, basePoints, idea) => {
    const points = playerStore.getPoints();

    // basePoints must be an array
    logger.shit('WRITE proper basePoints array in mvp-creator.js');
    basePoints = [
      { name: 'programming', amount: 100 },
      { name: 'marketing', amount: 100 }
    ];

    let hasEnoughPoints = true;
    basePoints.forEach(p => {
      if (points[p.name] < p.amount) hasEnoughPoints = false;
    });

    if (hasEnoughPoints) {
      // we can make prototype

      logger.shit('WRITE proper randomizer in mvp-creator.js');

      const p = productGenerator.create({ idea, name: 'WWWEB HOSTING' });

      playerActions.spendPoints(basePoints[1].amount, basePoints[0].amount);
      productActions.setInitialProductSettings(i, p.features, p.KPI)
    }
  },

  createCompetitorCompany(idea) {
    const p = productGenerator.create({ idea });

    productActions.createCompetitorCompany(p);
  }
}
