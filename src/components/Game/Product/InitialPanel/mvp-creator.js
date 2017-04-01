import productActions from '../../../../actions/product-actions';
import playerActions from '../../../../actions/player-actions';
import playerStore from '../../../../stores/player-store';

import logger from '../../../../helpers/logger/logger';

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
      const randomDefaultKPIs = {
        debt: 0, // technical debt. Shows, how fast can you implement new features
        clients: 10,
        newClients: 10,

        bugs: 10,

        currentUXBugs: 100,
        foundUXBugs: 0,
        fixedUXBugs: 0
      };



      const randomDefaultFeatures = {
        offer: {
          // 'portfolio': 0.81,
          // 'website': 1
        }, // features, that are attached to main idea
        development: {}, // backups, more dev servers, e.t.c.

        marketing: {}, // SEO, SMM, mass media, email marketing e.t.c.
        analytics: {}, // simple analytics (main KPIs),
        // middle (segments analytics), mid+ (segments + versions),

        // not only chat with users, but also localisations, content updates
        // and all sort of things, that you need doing constantly
        support: {},
        payment: {}
      };

      playerActions.spendPoints(basePoints[1].amount, basePoints[0].amount);
      productActions.setInitialProductSettings(i, randomDefaultFeatures, randomDefaultKPIs)
    }
  }
}
