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


    const chance = h.baseChance + productStore.getAnalyticsValueForFeatureCreating(id);
    const randomValue = 1; //getRandomRange(0, 1);// 0.25; 0.5 - commonExperience

    const quality = randomValue > chance ? h.data : 0;

    logger.log('improveFeature', id, featureGroup, featureName, quality, chance, randomValue);

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
