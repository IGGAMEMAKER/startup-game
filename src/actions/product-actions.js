import Dispatcher from '../dispatcher';
import * as ACTIONS from '../constants/actions/product-actions';
import logger from '../helpers/logger/logger';

import productStore from '../stores/product-store';

function getRandomRange(min, max) {
  return Math.random() * (max - min) + min;
}

export default {
  improveFeature: (id, featureGroup, featureName) => {
    // common business experience of team
    logger.shit('fix commonExperience in improveFeature() product-actions.js');
    const commonExperience = 0.25;
    // business experience of team in specific theme
    const analytics = 0.5 * productStore.getAnalyticsValueForFeatureCreating(id);
    const luck = getRandomRange(0, 0.35);// 0.25; 0.5 - commonExperience

    const quality = Math.min((commonExperience + analytics + luck), 1).toFixed(2);

    logger.log('improveFeature', id, featureGroup, featureName, quality);

    Dispatcher.dispatch({
      type: ACTIONS.PRODUCT_ACTIONS_IMPROVE_FEATURE,
      id,
      featureGroup,
      featureName,
      value: quality
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
