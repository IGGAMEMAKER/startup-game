import Dispatcher from '../dispatcher';
import * as ACTIONS from '../constants/actions/product-actions';
import logger from '../helpers/logger/logger';

import productStore from '../stores/product-store';

function getRandomRange(min, max) {
  return Math.random() * (max - min) + min;
}

export default {
  improveFeature: (id, featureGroup, featureName, h, max) => {
    logger.shit('fix commonExperience in improveFeature() product-actions.js');

    const analyticsChance = productStore.getAnalyticsValueForFeatureCreating(id);
    const chance = analyticsChance; // h.baseChance +

    // let quality; // randomValue > chance ? h.data : 0;

    let maxXP = 1000;
    if (chance === 0.4) {
      maxXP = 10000;
    } else if (chance === 0.3) {
      maxXP = 4000;
    } else if (chance === 0.1) {
      maxXP = 2000;
    }

    const quality = Math.floor(getRandomRange(0.1 * maxXP, maxXP));
    logger.log('improveFeature', id, featureGroup, featureName, quality, chance);

    Dispatcher.dispatch({
      type: ACTIONS.PRODUCT_ACTIONS_IMPROVE_FEATURE,
      id,
      featureGroup,
      featureName,
      value: quality,
      max
    })
  },
  improveFeatureByPoints: (id, featureGroup, featureName) => {
    logger.debug('improveFeatureByPoints', arguments);
    Dispatcher.dispatch({
      type: ACTIONS.PRODUCT_ACTIONS_IMPROVE_FEATURE_BY_POINTS,
      id,
      featureGroup,
      featureName
    })
  },
  setInitialProductSettings: (id, features, KPI) => {
    Dispatcher.dispatch({
      type: ACTIONS.PRODUCT_ACTIONS_SET_PRODUCT_DEFAULTS,
      id, features, KPI
    })
  },
  addClients: (id, clients) => {
    Dispatcher.dispatch({
      type: ACTIONS.PRODUCT_ACTIONS_CLIENTS_ADD,
      id,
      clients
    })
  },
  viralClients: (id, clients) => {
    Dispatcher.dispatch({
      type: ACTIONS.PRODUCT_ACTIONS_CLIENTS_VIRAL_ADD,
      id,
      clients
    })
  },
  removeClients: (id, clients) => {
    Dispatcher.dispatch({
      type: ACTIONS.PRODUCT_ACTIONS_CLIENTS_REMOVE,
      id,
      clients
    })
  }
};
